import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable()
export class MainService {
  socket;
  private socketHost = 'http://localhost:3000';
  socketStatus: String;
  dbConnectionStatus: String;

  constructor() {
    this.startSocketConnection()
  }

  startSocketConnection() {
    this.socket = io.connect(this.socketHost);

    this.socket.on('connect', () => {
      this.socketStatus = 'connected';
      console.log('socket:connected!');
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = 'disconnected';
      this.dbConnectionStatus = 'disconnected';
      console.log('socket:disconnected!');
    })

    this.socket.on('db-connected', () => {
      this.dbConnectionStatus = 'connected'
      console.log('db:connected');
    })

    this.socket.on('db-response', (data) => {
      console.log(data);
      // this.dbResponse = JSON.stringify(data);
    })
  }

  startDbConnection({ host, port, database, username, password, dialect }) {
    console.log('db:connecting...')
    this.socket.emit('db-connect', {
      host, port, database, username, password, dialect
    })
  }

  runDbQuery({ query }) {
    console.log('db:querying...')
    this.socket.emit('db-query', {
      query
    })
  }

}
