import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import {DynamoDBService} from "../../service/ddb.service";

export class DatasourceStuff {
  public userId: string;
  public id: string;
  public dialect: string;
  public host: string;
  public port: string;
  public database: string;
  public username: string;
  public password: string;
}

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DatasourceListComponent implements LoggedInCallback {

  public datasource: Array<DatasourceStuff> = [];

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
