import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { LoggedInCallback } from "../../service/cognito.service";

@Component({
  selector: 'awscognito-angular2-app',
  template: ''
})
export class LogoutComponent implements LoggedInCallback {

  constructor(public router: Router,
              public userService: UserLoginService) {
      this.userService.isAuthenticated(this)
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
      if (isLoggedIn) {
          this.userService.logout();
          this.router.navigate(['/auth/login']);
      }

      this.router.navigate(['/auth/login']);
  }
}
