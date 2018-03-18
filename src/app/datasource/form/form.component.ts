import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DynamoDBService } from '../../service/ddb.service';
import { DatasourceService } from "../../service/datasource.service";
import { Datasource } from "../datasource";

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './form.component.html'
})
export class DatasourceFormComponent implements OnInit {
  id: string;
  private sub: any;
  datasource: Datasource;
  errorMessage: string;

  constructor(
    public _datasource: DatasourceService,
    private route: ActivatedRoute,
    private router: Router,
    public ddb: DynamoDBService
  ) {
    this.router = router;
  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
   });

    this.datasource = new Datasource();

    if (this.id) {
      this.datasource = await this.ddb.getDatasourceEntry(this.id);
    }

    this.errorMessage = null;
  }

  async onSaveDatasource() {
    this.errorMessage = null;
    await this._datasource.save(this.datasource);
    this.router.navigate(['/securehome/datasource/list']);
  }

}
