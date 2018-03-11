import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AboutComponent, HomeComponent, HomeLandingComponent} from "./public/home.component";
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

const homeRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {path: 'about', component: AboutComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'confirmRegistration/:username', component: ConfirmRegistrationComponent},
            {path: 'resendCode', component: ResendCodeComponent},
            {path: 'forgotPassword/:email', component: ForgotPasswordStep2Component},
            {path: 'forgotPassword', component: ForgotPasswordStep1Component},
            {path: 'newPassword', component: NewPasswordComponent},
            { path: '', component: HomeLandingComponent }
        ]
    },
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
        {path: 'workspace', component: WorkspaceComponent},
        {path: '', component: MyProfileComponent}]
    }
];

const routes: Routes = [
    {
        path: '',
        children: [
            ...homeRoutes,
            ...secureHomeRoutes,
            {
                path: '',
                component: HomeComponent
            }
        ]
    },


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
