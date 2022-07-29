import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {NotificationItem} from "../../../core/models/notification-item.model";

@Component({
  selector: 'app-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.css']
})
export class NotificationsPanelComponent implements OnInit {
  @Input() dataSource$!: Observable<NotificationItem[]>;

  constructor() { }

  ngOnInit(): void {

  }
}
