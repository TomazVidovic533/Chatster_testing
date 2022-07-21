import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {Message} from "../../../../../core/models/message.model";
import {SmilePlus} from "lucide-angular";
import {AuthService} from "../../../../auth/services/auth.service";
import {Observable, take} from "rxjs";
import {Room} from "../../../../../core/models/room.model";


@Component({
  selector: 'app-send-message-panel',
  templateUrl: './send-message-panel.component.html',
  styleUrls: ['./send-message-panel.component.css']
})
export class SendMessagePanelComponent implements OnInit {

  sendMessageForm!: FormGroup;
  @Input() roomId!: string | undefined;

  smilePlus = SmilePlus;

  constructor(private formBuilder: FormBuilder,
              private chatService: ChatService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.sendMessageForm = this.formBuilder.group({
      message: new FormControl(null, [Validators.required])
    });
  }

  sendMessage(event: Event) {
    this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
      if (this.roomId != null) {
        this.chatService.sendMessageToRoom({
          created_at: new Date().getTime(),
          sent_by: myUserData?.id,
          message: this.sendMessageForm.get('message')?.value,
        } as Message, this.roomId)
      }
    })
  }

}
