import { Component, OnInit } from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {Observable} from "rxjs";
import {Message} from "../../models/message.model";

@Component({
  selector: 'app-messages-test',
  templateUrl: './messages-test.component.html',
  styleUrls: ['./messages-test.component.css']
})
export class MessagesTestComponent implements OnInit {

  messages$!: Observable<Message[]>;
  message$!: Observable<Message>;

  constructor(private m:MessagesService) {

    this.messages$ = this.m.getMessages();
  }

  ngOnInit(): void {
  }

  sendMessage(userid:string, roomid:string,message:string){
    let mes:Message = {
      created_at: new Date().getTime(),
      sent_by: 'ccc',
      message: 'to je popolnoma novi message'
    };
    this.m.addMessage(mes);
  }

  edit(){
    let mes:Message = {
      created_at: new Date().getTime(),
      sent_by: 'ccc',
      message: 'to je novi editan messageggggggg'
    };
    this.m.editMessage(mes);
  }

  del(){
    this.m.deleteMessage();
  }

}
