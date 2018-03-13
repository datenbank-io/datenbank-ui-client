import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-store';

import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  @LocalStorage() text: string = "";
  options:any = { printMargin: false };

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
  }

  parseQueryEditor(queryEditor: string) {
    this.workspaceService.emit('runQuery', { query: queryEditor });
  }
}
