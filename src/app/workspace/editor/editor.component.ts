import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-store';

import { MainService } from '../../main.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  @LocalStorage() text: string = "";
  options:any = { printMargin: false };

  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  parseQueryEditor(queryEditor: string) {
    this.mainService.runDbQuery({ query: queryEditor });
  }
}
