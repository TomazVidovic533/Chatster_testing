import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../../models/user.model";

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css']
})
export class UsersOverviewComponent implements OnInit {

  people$!: Observable<User>;

  constructor() { }

  ngOnInit(): void {
  }

}
