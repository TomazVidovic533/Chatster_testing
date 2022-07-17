import { Component, OnInit } from '@angular/core';
import {first, Observable} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,private userService: UsersService) {
  }
  userData$!: Observable<User>;

  ngOnInit(): void {

    let id=this.route.snapshot.paramMap.get('userId')

    if(id){
      this.userData$ = this.userService.get(id);
      this.userData$.subscribe();
    }
  }

}
