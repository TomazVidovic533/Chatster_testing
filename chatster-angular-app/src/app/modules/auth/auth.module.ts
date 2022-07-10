import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { NotVerifiedComponent } from './views/not-verified/not-verified.component';
import { NotFoundCardComponent } from './components/not-found-card/not-found-card.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ResendVerificationFormComponent } from './components/resend-verification-form/resend-verification-form.component';
import {SignInComponent} from "./views/sign-in/sign-in.component";



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    NotVerifiedComponent,
    NotFoundCardComponent,
    SignInFormComponent,
    SignUpFormComponent,
    ResendVerificationFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
