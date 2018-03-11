import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DatasourceService } from "../../service/datasource.service";
import { CognitoCallback } from "../../service/cognito.service";
import { DatasourceStuff } from '../list/list.component';

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class DatasourceAddComponent implements CognitoCallback {
  datasource: DatasourceStuff;
  router: Router;
  errorMessage: string;

  constructor(public _datasource: DatasourceService, router: Router) {
      this.router = router;
      this.onInit();
  }

  onInit() {
      this.datasource = new DatasourceStuff();
      this.errorMessage = null;
  }

  async onAddDatasource() {
      this.errorMessage = null;
      await this._datasource.register(this.datasource);
      this.router.navigate(['/securehome/datasource/list']);
  }

  cognitoCallback(message: string, result: any) {
      if (message != null) { //error
          this.errorMessage = message;
          console.log("result: " + this.errorMessage);
      } else { //success
          //move to the next step
          console.log("redirecting");
          this.router.navigate(['/home/confirmRegistration', result.user.username]);
      }
  }
}
