import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatroomComponent} from "./views/chatroom/chatroom.component";
import {CallroomComponent} from "./views/callroom/callroom.component";
import {
  ChatroomChatContainerComponent
} from "./components/layout/chatroom-chat-container/chatroom-chat-container.component";
import {ChatViewComponent} from "./views/chat-view/chat-view.component";


const routes: Routes = [
  {
    path: '', component: ChatroomComponent,
    children: [
      {
        path: ':roomId', component: ChatViewComponent
      },
    ]
  },
  {
    path: 'call/:roomId', component: CallroomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
