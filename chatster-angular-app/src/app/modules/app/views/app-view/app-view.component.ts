import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../auth/services/auth.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {

  constructor(private translate: TranslateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'si']);
    this.translate.setDefaultLang('si');

        this.authService.getUserData().pipe().subscribe((user) => {
      if (user?.language == 'Slovene') {
        this.translate.use('si');
      } else if (user?.language == 'English') {
        this.translate.use('en');
      } else if (user?.language == 'Spanish') {
        this.translate.use('esp');
      }
    })
  }




}
