import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatroomComponent} from "./views/chatroom/chatroom.component";

const routes: Routes = [{
  path: '', component: ChatroomComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
