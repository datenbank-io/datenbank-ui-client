import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';

@Component({
  selector: 'app-response-grid',
  templateUrl: './response-grid.component.html'
})
export class ResponseGridComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  constructor() {}

  ngOnInit() {
    this.gridOptions = {
      enableAutoResize: false,
      enableCellNavigation: true
    };
  }

}
