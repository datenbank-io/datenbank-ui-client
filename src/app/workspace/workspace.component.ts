import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DatasourceModel } from '../datasource/datasource.model';
import { WorkspaceService } from '../service/workspace.service';
import { DynamoDBService } from '../service/ddb.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html'
})
export class WorkspaceComponent implements OnInit {
  id: string;
  private sub: any;
  private datasource: DatasourceModel;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private workspaceService: WorkspaceService, public ddb: DynamoDBService) {}

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });

    this.datasource = await this.ddb.getDatasourceEntry(this.id);
    this.workspaceService.datasource = this.datasource;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
