import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {SignInComponent} from "./views/sign-in/sign-in.component";
import {SignInFormComponent} from "./components/sign-in-form/sign-in-form.component";
import {SignUpFormComponent} from "./components/sign-up-form/sign-up-form.component";
import {SignUpComponent} from "./views/sign-up/sign-up.component";
import {
  ResendVerificationFormComponent
} from "./components/resend-verification-form/resend-verification-form.component";
import {NotVerifiedComponent} from "./views/not-verified/not-verified.component";


@NgModule({
  declarations: [
    SignInComponent,
    SignInFormComponent,
    SignUpComponent,
    SignUpFormComponent,
    ResendVerificationFormComponent,
    NotVerifiedComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
