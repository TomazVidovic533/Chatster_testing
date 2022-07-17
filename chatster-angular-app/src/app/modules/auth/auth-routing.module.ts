import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./views/sign-up/sign-up.component";
import {SignInComponent} from "./views/sign-in/sign-in.component";
import {ForgotPasswordComponent} from "./views/forgot-password/forgot-password.component";
import {
  ResendVerificationFormComponent
} from "./components/resend-verification-form/resend-verification-form.component";

import {AngularFireAuthGuard, canActivate} from '@angular/fire/compat/auth-guard';
import {hasCustomClaim, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import {map} from "rxjs";
import { customClaims } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/sign-in']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['app/home']);
const belongsToAccount = ({next}: { next: any }) => {
  return hasCustomClaim(`account-${next.params.id}`);
};
const onlyAllowSelf = ({next}: { next: any }) => {
  return map(user => {
    // @ts-ignore
    return next.params.userId === user.uid && !!user;
  });
};


const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
    ,
    ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'resend-verification',
    component: ResendVerificationFormComponent,
    ...canActivate(redirectUnauthorizedToLogin)
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
