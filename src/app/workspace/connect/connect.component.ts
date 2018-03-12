import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainService } from '../../main.service';
import { WorkspaceService } from '../../service/workspace.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html'
})
export class ConnectComponent implements OnInit {
  @ViewChild('connectForm') f: NgForm;

  constructor(
    private mainService: MainService,
    public workspace: WorkspaceService
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.mainService.startDbConnection({
      host: f.value.host,
      port: f.value.port,
      database: f.value.database,
      username: f.value.username,
      password: f.value.password,
      dialect: f.value.dialect
    })

    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

}
