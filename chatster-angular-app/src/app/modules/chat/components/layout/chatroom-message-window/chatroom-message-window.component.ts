import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MappedMessage, Message} from "../../../../../core/models/message.model";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-chatroom-message-window',
  templateUrl: './chatroom-message-window.component.html',
  styleUrls: ['./chatroom-message-window.component.css']
})
export class ChatroomMessageWindowComponent implements OnInit {
  @ViewChild('scrollBar') private myScrollContainer!: ElementRef;
  @Input() chatMessages$!: Observable<MappedMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatMessages$.subscribe();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
