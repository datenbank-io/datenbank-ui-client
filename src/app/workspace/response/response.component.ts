import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ResponseGridComponent } from '../response-grid/response-grid.component';

import { MainService } from '../../main.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private mainService: MainService, private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    setTimeout(() => {
      console.log('db-response-prepare')
      this.mainService.socket.on('db-response', (data) => {
        const columnDefinitions = Object.keys(data[0]).map((e) => {
          return { id: e, name: e, field: e }
        });

        for (let i = 0; i < data.length; i++) {
          data[i].id = i;
        }

        this.addComponent({
          columnDefinitions, dataset: data
        });
      })
    }, 1000);
  }

  addComponent({ columnDefinitions, dataset }) {
    var comp = this._cfr.resolveComponentFactory(ResponseGridComponent);
    var expComponent = this.container.createComponent(comp);

    expComponent.instance.columnDefinitions = columnDefinitions;
    expComponent.instance.dataset = dataset;
}

}
