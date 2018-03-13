import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { DatasourceModel } from '../datasource/datasource.model';

import * as io from 'socket.io-client';

@Injectable()
export class WorkspaceService extends EventEmitter {
  private socket;
  private socketHost = 'http://localhost:3000';
  private isReady: Boolean;
  private isRunning: Boolean = false;

  connect(datasource: DatasourceModel) {
    this.socket = io.connect(this.socketHost);

    this.socket.on('connect', () => {
      console.log('socket:connected!');

      this.socket.emit('db-connect', {
        dialect: datasource.dialect,
        host: datasource.host,
        port: datasource.port,
        database: datasource.database,
        username: datasource.username,
        password: datasource.password
      })
    });

    this.socket.on('disconnect', () => {
      this.isReady = false;
      console.log('socket:disconnected!');
    })

    this.socket.on('db-connected', () => {
      this.isReady = true;
      console.log('db:connected');
    })

    this.socket.on('db-response', (data) => {
      this.isRunning = false;
      console.log(data);
      this.emit('queryResponse', data);
    })

    this.on('runQuery', ({ query }) => {
      this.isRunning = true;
      this.socket.emit('db-query', { query })
    })
  }

  disconnect() {
    console.log('db:closing...')
    this.socket.disconnect();
    this.isReady = false;
    this.isRunning = false;
    this.socket = undefined;
  }

}
