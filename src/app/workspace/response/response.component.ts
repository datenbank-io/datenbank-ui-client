import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ResponseGridComponent } from '../response-grid/response-grid.component';

import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private workspaceService: WorkspaceService, private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.workspaceService.on('queryResponse', (data) => {
      console.log('on-query-response')

      const columnDefinitions = Object.keys(data[0]).map((e) => {
        return {
          id: e,
          name: e,
          field: e,
          resizable: true,
          selectable: true,
          cssClass: undefined,
          minWidth: undefined,
          maxWidth: undefined
        }
      });

      columnDefinitions.unshift({
        id: '#',
        name: '#',
        field: 'id',
        resizable: false,
        selectable: false,
        cssClass: 'slick-cell-id',
        minWidth: 50,
        maxWidth: 50
      })

      for (let i = 0; i < data.length; i++) {
        data[i].id = i;
      }

      this.addComponent({
        columnDefinitions, dataset: data
      });
    })

  }

  addComponent({ columnDefinitions, dataset }) {
    var comp = this._cfr.resolveComponentFactory(ResponseGridComponent);
    this.container.clear();
    var expComponent = this.container.createComponent(comp);

    expComponent.instance.columnDefinitions = columnDefinitions;
    expComponent.instance.dataset = dataset;
}

}
