import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {Message} from "../../../../../core/models/message.model";
import {SmilePlus} from "lucide-angular";


@Component({
  selector: 'app-send-message-panel',
  templateUrl: './send-message-panel.component.html',
  styleUrls: ['./send-message-panel.component.css']
})
export class SendMessagePanelComponent implements OnInit {

  sendMessageForm!: FormGroup;

  smilePlus=SmilePlus;

  constructor(private formBuilder: FormBuilder,private chatService:ChatService) {
  }

  ngOnInit(): void {
    this.sendMessageForm = this.formBuilder.group({
      message: new FormControl(null, [Validators.required])
    });
  }

  sendMessage(event: Event) {
    let newMessage = {
      created_at: new Date().getTime(),
      sent_by: localStorage.getItem('myUserId'),
      message:  this.sendMessageForm.get('message')?.value,
    } as Message;

    console.log(newMessage)

    this.chatService.sendMessageToRoom(newMessage, 'nekaj')
  }

}
