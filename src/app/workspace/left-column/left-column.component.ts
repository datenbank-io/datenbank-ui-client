import { Component, OnInit } from '@angular/core';
import { TreeModule } from 'angular-tree-component';

import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html'
})
export class LeftColumnComponent implements OnInit {
  nodes = [
    {
      name: 'public',
      children: [
        { name: 'tables', children: [{ name: 'x' }, { name: 'y' }] },
        { name: 'views', children: [{ name: 'x'}, {name: 'z'}] }
      ]
    }
  ];
  options = {
    useVirtualScroll: true
  };

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
  }

}
