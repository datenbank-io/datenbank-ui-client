import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DatasourceModel } from '../datasource/datasource.model';
import { DynamoDBService } from '../service/ddb.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html'
})
export class WorkspaceComponent implements OnInit {
  id: string;
  private sub: any;
  private datasource: DatasourceModel;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute, private router: Router,
    public ddb: DynamoDBService) {}

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });

    this.datasource = await this.ddb.getDatasourceEntry(this.id);

    this.mainService.startDbConnection({
      host: this.datasource.host,
      port: this.datasource.port,
      database: this.datasource.database,
      username: this.datasource.username,
      password: this.datasource.password,
      dialect: this.datasource.dialect
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.mainService.closeDbConnection();
  }
}
