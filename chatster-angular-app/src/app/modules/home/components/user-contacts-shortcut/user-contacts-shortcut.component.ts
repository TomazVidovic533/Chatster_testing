import { Component, OnInit } from '@angular/core';
import {Observable, take} from "rxjs";
import {DataObjectItem} from "../../../../shared/models/data-object-item";
import {UsersService} from "../../../people/services/users.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-user-contacts-shortcut',
  templateUrl: './user-contacts-shortcut.component.html',
  styleUrls: ['./user-contacts-shortcut.component.css']
})
export class UserContactsShortcutComponent implements OnInit {
  userContacts$!: Observable<DataObjectItem[]>;

  constructor(private usersService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
      // @ts-ignore
      this.userContacts$ = this.usersService.getUsersContacts(user.id);
    })

  }

}
