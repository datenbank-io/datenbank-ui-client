import { Component, OnInit } from '@angular/core';

import { MainService } from '../../main.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  parseQueryEditor(queryEditor: string) {
    this.mainService.runDbQuery({ query: queryEditor });
  }
}
