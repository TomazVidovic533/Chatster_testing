import { Component, OnInit } from '@angular/core';
import {Observable, shareReplay} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {UsersService} from "../../services/users.service";



@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css']
})
export class UsersOverviewComponent implements OnInit {

  users$!: Observable<User[]>;
  constructor(private usersService: UsersService ) {}

  ngOnInit(): void {
    this.users$ =  this.usersService.list().pipe(shareReplay(1));
    this.users$.subscribe((res)=>{console.log("list", res)});
  }
}
