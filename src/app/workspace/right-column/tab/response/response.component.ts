import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ResponseGridComponent } from '../response-grid/response-grid.component';

import { WorkspaceService } from '../../../workspace.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private workspaceService: WorkspaceService, private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.workspaceService.on('queryResponse', (data) => {

      if (data.type !== 'query-result') return false

      // console.log('on-query-response')
      let columnDefinitions;

      if (Array.isArray(data.content) && data.content.length >= 1) {
        columnDefinitions = Object.keys(data.content[0]).map((e) => {
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

        for (let i = 0; i < data.content.length; i++) {
          data.content[i].id = i;
        }
      }

      else {
        columnDefinitions = [
          {
            id: 'content',
            name: 'content',
            field: 'content',
            resizable: true,
            cssClass: undefined,
            minWidth: undefined,
            maxWidth: undefined
          }
        ]

        data.content = [
          {
            id: '1',
            content: data.content
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

      console.log('-')
      console.log(data.content);

      this.addComponent({
        columnDefinitions,
        dataset: data.content
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
