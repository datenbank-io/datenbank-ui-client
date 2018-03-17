import { Component, OnInit } from '@angular/core';
import { Integer } from 'aws-sdk/clients/rds';

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html'
})
export class RightColumnComponent implements OnInit {
  tabs = [{ label: 'Editor 0' }]
  counter: Integer = 0;

  constructor() { }

  ngOnInit() {
  }

  addTab() {
    this.counter += 1;

    this.tabs.push({
      label: `Editor ${this.counter}`
    })
  }

}
