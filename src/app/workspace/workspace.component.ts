import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Datasource } from '../datasource/datasource';
import { DynamoDBService } from '../service/ddb.service';
import { WorkspaceService } from './workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html'
})
export class WorkspaceComponent implements OnInit {
  id: string;
  private sub: any;
  private datasource: Datasource;

  constructor(
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    public ddb: DynamoDBService) {}

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });

    this.datasource = await this.ddb.getDatasourceEntry(this.id);

    this.workspaceService.connect(this.datasource);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.workspaceService.disconnect();
  }
}
