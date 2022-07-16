import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resend-verification-form',
  templateUrl: './resend-verification-form.component.html',
  styleUrls: ['./resend-verification-form.component.css']
})
export class ResendVerificationFormComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  continueToApplication(event: Event){
    this.router.navigate(['/app/home']);
  }

  resendVerificationEmail(event: Event){
   this.authService.resendVerificationEmail();
  }

}
