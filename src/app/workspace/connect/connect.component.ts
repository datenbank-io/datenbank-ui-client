import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainService } from '../../main.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  @ViewChild('heroForm') f: NgForm;

  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.mainService.startDbConnection({
      database: f.value.database,
      username: f.value.username,
      password: f.value.password,
      dialect: f.value.dialect
    })

    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

}
