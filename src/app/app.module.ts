import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from "@angular/http";

import { TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { AceEditorModule } from 'ng2-ace-editor';
import { TreeModule } from 'angular-tree-component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatButtonModule, MatGridListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { EditorComponent } from './workspace/right-column/tab/editor/editor.component';
import { ResponseComponent } from './workspace/right-column/tab/response/response.component';

import { WorkspaceService } from './workspace/workspace.service';
import { UserRegistrationService } from "./service/user-registration.service";
import { UserParametersService } from "./service/user-parameters.service";
import { UserLoginService } from "./service/user-login.service";
import { CognitoUtil } from "./service/cognito.service";
import { AwsUtil } from "./service/aws.service";
import { DynamoDBService } from "./service/ddb.service";
import { DatasourceService } from "./service/datasource.service";

import { ResponseGridComponent } from './workspace/right-column/tab/response-grid/response-grid.component';

import { NewPasswordComponent } from "./auth/new-password/new-password.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ForgotPasswordStep1Component, ForgotPasswordStep2Component } from "./auth/forgot-password/forgot-password.component";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { ConfirmRegistrationComponent } from "./auth/confirm-registration/confirm-registration.component";
import { ResendCodeComponent } from "./auth/resend-code/resend-code.component";
import { MFAComponent } from './auth/mfa/mfa.component';
import { UseractivityComponent } from "./secure/useractivity/useractivity.component";
import { MyProfileComponent } from "./secure/profile/myprofile.component";
import { SecureHomeComponent } from "./secure/landing/securehome.component";
import { JwtComponent } from "./secure/jwttokens/jwt.component";

import { routing } from "./app.routes";
import { WorkspaceComponent } from './workspace/workspace.component';
import { DatasourceListComponent } from './datasource/list/list.component';
import { DatasourceFormComponent } from './datasource/form/form.component';
import { DatasourceRemoveComponent } from './datasource/remove/remove.component';
import { LeftColumnComponent } from './workspace/left-column/left-column.component';
import { RightColumnComponent } from './workspace/right-column/right-column.component';
import { TabComponent } from './workspace/right-column/tab/tab.component';

import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { TopComponent } from './workspace/top/top.component';
import { DialogComponent } from './shared/dialog/dialog.component';

@NgModule({
  declarations: [
    NewPasswordComponent,
    LoginComponent,
    LogoutComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    RegisterComponent,
    MFAComponent,
    UseractivityComponent,
    MyProfileComponent,
    SecureHomeComponent,
    JwtComponent,
    AppComponent,
    EditorComponent,
    ResponseComponent,
    ResponseGridComponent,
    WorkspaceComponent,
    ConfirmRegistrationComponent,
    DatasourceListComponent,
    DatasourceFormComponent,
    DatasourceRemoveComponent,
    LeftColumnComponent,
    RightColumnComponent,
    TabComponent,
    TopComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot(),
    AngularSlickgridModule.forRoot(),
    AceEditorModule,
    TreeModule,
    HttpModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    NoopAnimationsModule,
    AsyncLocalStorageModule,
    routing
  ],
  entryComponents: [
    ResponseGridComponent,
    DialogComponent
  ],
  providers: [
    WorkspaceService,
    CognitoUtil,
    AwsUtil,
    DynamoDBService,
    UserRegistrationService,
    UserLoginService,
    UserParametersService,
    DatasourceService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
