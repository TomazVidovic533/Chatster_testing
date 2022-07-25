import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() callId!: string;
  @Input() avatar!: string;
  @Input() name!: string;


  constructor() { }

  ngOnInit(): void {
  }

}
