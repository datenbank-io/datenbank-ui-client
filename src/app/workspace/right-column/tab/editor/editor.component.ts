import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { WorkspaceService } from '../../../workspace.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  @ViewChild('editor') editor;
  @Input() tab: Object;

  options:any = { printMargin: false };

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
    // this.text = 'abc';
  }

  parseQueryEditor() {
    const selectedValue = this.editor._editor.getSelectedText();
    const value = this.editor.value;
    const query = (selectedValue) ? selectedValue : value;

    this.workspaceService.emit('runQuery', { query, ref: this.tab['id'] });
  }
}
