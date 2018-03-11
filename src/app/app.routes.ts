import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {SecureHomeComponent} from "./secure/landing/securehome.component";
import {MyProfileComponent} from "./secure/profile/myprofile.component";
import {JwtComponent} from "./secure/jwttokens/jwt.component";
import {UseractivityComponent} from "./secure/useractivity/useractivity.component";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { ConfirmRegistrationComponent } from "./auth/confirm-registration/confirm-registration.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ForgotPasswordStep1Component, ForgotPasswordStep2Component } from "./auth/forgot-password/forgot-password.component";
import { ResendCodeComponent } from "./auth/resend-code/resend-code.component";
import { NewPasswordComponent } from "./auth/new-password/new-password.component";
import { WorkspaceComponent } from "./workspace/workspace.component";
import { DatasourceListComponent } from './datasource/list/list.component';
import { DatasourceAddComponent } from './datasource/add/add.component';
import { DatasourceRemoveComponent } from './datasource/remove/remove.component';

const homeRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
      path: 'auth',
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'confirmRegistration/:username', component: ConfirmRegistrationComponent },
        { path: 'resendCode', component: ResendCodeComponent },
        { path: 'forgotPassword/:email', component: ForgotPasswordStep2Component },
        { path: 'forgotPassword', component: ForgotPasswordStep1Component },
        { path: 'newPassword', component: NewPasswordComponent}
      ]
    }
];

const secureHomeRoutes: Routes = [
    {

        path: '',
        redirectTo: '/securehome',
        pathMatch: 'full'
    },
    {
        path: 'securehome', component: SecureHomeComponent, children: [
        {path: 'logout', component: LogoutComponent},
        {path: 'jwttokens', component: JwtComponent},
        {path: 'myprofile', component: MyProfileComponent},
        {path: 'useractivity', component: UseractivityComponent},
        {
          path: 'datasource',
          children: [
            { path: 'list', component: DatasourceListComponent },
            { path: 'add', component: DatasourceAddComponent },
            { path: 'remove/:id', component: DatasourceRemoveComponent }
          ]
        },
        {path: '', component: MyProfileComponent}]
    },
    {path: 'workspace/:id', component: WorkspaceComponent},
];

const routes: Routes = [
    {
        path: '',
        children: [
            ...homeRoutes,
            ...secureHomeRoutes,
            {
                path: '',
                component: LoginComponent
            }
        ]
    },


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
