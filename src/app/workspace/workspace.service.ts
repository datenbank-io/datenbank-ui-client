import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Datasource } from '../datasource/datasource';

import * as io from 'socket.io-client';

@Injectable()
export class WorkspaceService extends EventEmitter {
  private socket;
  private socketHost = 'http://localhost:3000';
  private isReady: Boolean;
  private isRunning: Boolean = false;
  public explorer;

  connect(datasource: Datasource) {
    this.socket = io.connect(this.socketHost);
    this.explorer = [];
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

    this.socket.on('db-payload', (data) => {
      this.isRunning = false;
      this.emit('queryResponse', data);
    })

    this.on('runQuery', ({ query, ref }) => {
      this.isRunning = true;
      this.socket.emit('db-query', { query, ref })
    })

    // nodes = [
    //   {
    //     name: 'public',
    //     children: [
    //       { name: 'tables', children: [{ name: 'x' }, { name: 'y' }] },
    //       { name: 'views', children: [{ name: 'x'}, {name: 'z'}] }
    //     ]
    //   }
    // ];

    this.on('queryResponse', (data) => {
      if (data.type === 'explorer') {
        const content = data.content;
        content.map((e) => {
          e.children = [
            { name: 'tables', children: e.tables },
            { name: 'views', children: e.views }
          ]

          delete e.tables;
          delete e.views;
        })
        this.explorer = content;
      }
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
