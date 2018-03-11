import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import {DynamoDBService} from "../../service/ddb.service";
import { DatasourceModel } from "../datasource.model";

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DatasourceListComponent implements LoggedInCallback {

  public datasource: Array<DatasourceModel> = [];

  constructor(public router: Router, public ddb: DynamoDBService, public userService: UserLoginService) {
      this.userService.isAuthenticated(this);
      console.log("in DatasourceListComponent");
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
      if (!isLoggedIn) {
          this.router.navigate(['/home/login']);
      } else {
          console.log("scanning DDB");
          this.ddb.getDatasourceEntries(this.datasource);
      }
  }

}
