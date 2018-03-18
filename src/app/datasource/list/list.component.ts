import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import {DynamoDBService} from "../../service/ddb.service";
import { Datasource } from "../datasource";
import { MatDialogRef, MatDialog } from "@angular/material";
import { DialogComponent } from "../../shared/dialog/dialog.component";

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './list.component.html'
})
export class DatasourceListComponent implements LoggedInCallback {
  dialogRef: MatDialogRef<DialogComponent>;
  public datasource: Array<Datasource> = [];

  constructor(
    public router: Router,
    public ddb: DynamoDBService,
    public userService: UserLoginService,
    public dialog: MatDialog
  ) {
    this.userService.isAuthenticated(this);
    console.log("in DatasourceListComponent");
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
        this.router.navigate(['/auth/login']);
    } else {
        console.log("scanning DDB");
        this.ddb.getDatasourceEntries(this.datasource);
    }
  }

  removeDatasource(datasource) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.message = `Are you sure you want to delete? ${datasource.dialect}/${datasource.host}`
    this.dialogRef.componentInstance.confirmText = 'Yes, delete it!';
    this.dialogRef.componentInstance.declineText = 'No, cancel.'

    this.dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.router.navigate([`/securehome/datasource/remove/${datasource.id}`]);
      this.dialogRef = null;
    })
  }
}
