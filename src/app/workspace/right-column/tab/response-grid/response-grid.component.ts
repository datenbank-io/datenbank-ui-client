import { Component, OnInit, Input } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';

@Component({
  selector: 'app-response-grid',
  templateUrl: './response-grid.component.html'
})
export class ResponseGridComponent implements OnInit {
  @Input() tabId: string;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  gridId = Date.now();

  constructor() {}

  ngOnInit() {
    this.gridOptions = {
      enableAutoResize: true,
      enableCellNavigation: true,
      enableGridMenu: false
    };
  }

}
