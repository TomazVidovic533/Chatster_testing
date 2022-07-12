import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import {ChatroomComponent} from "./views/chatroom/chatroom.component";


@NgModule({
  declarations: [
    ChatroomComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
