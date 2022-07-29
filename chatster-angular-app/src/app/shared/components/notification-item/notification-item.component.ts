import {Component, Input, OnInit} from '@angular/core';
import {NotificationItem} from "../../../core/models/notification-item.model";
import {CallService} from "../../../modules/chat/services/call.service";
import {AuthService} from "../../../modules/auth/services/auth.service";
import {take} from "rxjs";

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() item!: NotificationItem;

  constructor(private callService: CallService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  denyCall(callId: string) {
    this.authService.getUserData().pipe(take(1)).subscribe((userData)=>{
      if(userData){
        // @ts-ignore
        this.callService.acceptCallOffer(callId,userData.id)
      }
    })
  }

  acceptCall(callId: string) {
    this.authService.getUserData().pipe(take(1)).subscribe((userData)=>{
      if(userData){
        // @ts-ignore
        this.callService.denyCallOffer(callId,userData.id)
      }
    })
  }
}
