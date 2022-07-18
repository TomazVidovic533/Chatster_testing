import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Message} from "../../../../../core/models/message.model";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-chatroom-message-window',
  templateUrl: './chatroom-message-window.component.html',
  styleUrls: ['./chatroom-message-window.component.css']
})
export class ChatroomMessageWindowComponent implements OnInit {

  chatMessages$!: Observable<Message[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

  }

}
