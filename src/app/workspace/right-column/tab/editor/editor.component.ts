import { Component, OnInit, ViewChild } from '@angular/core';
// import { LocalStorage } from 'ngx-store';

import { WorkspaceService } from '../../../workspace.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  @ViewChild('editor') editor;
  // @LocalStorage() text: string = "";
  options:any = { printMargin: false };

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
  }

  parseQueryEditor() {
    const selectedValue = this.editor._editor.getSelectedText();
    const value = this.editor.value;
    const query = (selectedValue) ? selectedValue : value;

    console.log(this.editor._editor.getSelectedText())
    console.log(query);
    this.workspaceService.emit('runQuery', { query });
  }
}
