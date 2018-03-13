import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatasourceService } from "../../service/datasource.service";
import { Datasource } from "../datasource";

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './add.component.html'
})
export class DatasourceAddComponent implements OnInit {
  datasource: Datasource;
  router: Router;
  errorMessage: string;

  constructor(public _datasource: DatasourceService, router: Router) {
      this.router = router;
  }

  ngOnInit() {
      this.datasource = new Datasource();
      this.errorMessage = null;
  }

  async onAddDatasource() {
      this.errorMessage = null;
      await this._datasource.register(this.datasource);
      this.router.navigate(['/securehome/datasource/list']);
  }

}
