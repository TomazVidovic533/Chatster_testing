import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./views/sign-up/sign-up.component";
import {SignInComponent} from "./views/sign-in/sign-in.component";
import {ForgotPasswordComponent} from "./views/forgot-password/forgot-password.component";
import {
  ResendVerificationFormComponent
} from "./components/resend-verification-form/resend-verification-form.component";

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'resend-verification',
    component: ResendVerificationFormComponent
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
