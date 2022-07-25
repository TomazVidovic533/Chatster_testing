import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataObjectItem} from "../../../../shared/models/data-object-item";

@Component({
  selector: 'app-user-contacts-shortcut',
  templateUrl: './user-contacts-shortcut.component.html',
  styleUrls: ['./user-contacts-shortcut.component.css']
})
export class UserContactsShortcutComponent implements OnInit {
  userContacts$!: Observable<DataObjectItem[]>;

  constructor() { }

  ngOnInit(): void {

  }

}
