import { Component, OnInit } from '@angular/core';

import { WorkspaceService } from '../workspace.service';

import { AsyncLocalStorage } from 'angular-async-local-storage';

import * as cuid from "cuid";

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html'
})
export class RightColumnComponent implements OnInit {
  public tabs = [];

  constructor(protected localStorage: AsyncLocalStorage) { }

  ngOnInit() {
    this.localStorage.getItem('tabs').subscribe((_tabs) => {
      if (!_tabs) {
        this.tabs = _tabs = []
        this.addTab();
      }

      this.tabs = _tabs;
    });

    setInterval(() => {
      this.saveTabs()
    }, 3000);
  }

  addTab() {
    let counter = this.tabs.length;
    counter += 1;

    this.tabs.push({
      label: `Tab ${counter}`,
      id: cuid()
    })

    this.saveTabs();
  }

  removeTab(id) {
    this.tabs.forEach( (item, index) => {
      if(item.id === id) this.tabs.splice(index, 1);
    });

    this.saveTabs();
  }

  saveTabs() {
    this.localStorage.setItem('tabs', this.tabs).subscribe((x) => {
      console.log('saved tabs!')
    });
  }
}
