import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../../core/models/message.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  myUserId!: string;
  @Input() messageData!: Message;

  constructor() {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.myUserId = localStorage.getItem('myUserId');

  }

}
