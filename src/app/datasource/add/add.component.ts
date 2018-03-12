import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatasourceService } from "../../service/datasource.service";
import { DatasourceModel } from "../datasource.model";

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './add.component.html'
})
export class DatasourceAddComponent implements OnInit {
  datasource: DatasourceModel;
  router: Router;
  errorMessage: string;

  constructor(public _datasource: DatasourceService, router: Router) {
      this.router = router;
  }

  ngOnInit() {
      this.datasource = new DatasourceModel();
      this.errorMessage = null;
  }

  async onAddDatasource() {
      this.errorMessage = null;
      await this._datasource.register(this.datasource);
      this.router.navigate(['/securehome/datasource/list']);
  }

}
