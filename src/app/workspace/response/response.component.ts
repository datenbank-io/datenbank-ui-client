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
      let columnDefinitions;

      if (data.success && Array.isArray(data.result)) {
        columnDefinitions = Object.keys(data.result[0]).map((e) => {
          return {
            id: e,
            name: e,
            field: e,
            resizable: true,
            cssClass: undefined,
            minWidth: undefined,
            maxWidth: undefined
          }
        });

        for (let i = 0; i < data.result.length; i++) {
          data.result[i].id = i;
        }
      }

      else {
        columnDefinitions = [
          {
            id: 'result',
            name: 'result',
            field: 'result',
            resizable: true,
            cssClass: undefined,
            minWidth: undefined,
            maxWidth: undefined
          }
        ]

        data.result = [
          {
            id: '1',
            result: data.result
          }
        ]
      }

      columnDefinitions.unshift({
        id: '#',
        name: '#',
        field: 'id',
        resizable: false,
        cssClass: 'slick-cell-id',
        minWidth: 50,
        maxWidth: 50
      })

      this.addComponent({
        columnDefinitions,
        dataset: data.result
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
