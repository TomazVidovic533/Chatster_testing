import { Component, OnInit } from '@angular/core';
import {Observable, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  userData: any = {
    name:"name",
    gender: 'g'
  };

  userData$!: Observable<User | null>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userData$=this.authService.getUserData().pipe(take(1));
    this.userData$.subscribe();

  }

}
