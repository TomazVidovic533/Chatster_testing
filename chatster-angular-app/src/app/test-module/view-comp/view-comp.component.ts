import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Message} from "../../../models/message.model";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-view-comp',
  templateUrl: './view-comp.component.html',
  styleUrls: ['./view-comp.component.css']
})
export class ViewCompComponent implements OnInit {

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
