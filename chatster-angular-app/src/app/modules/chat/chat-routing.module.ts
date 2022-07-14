import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatroomComponent} from "./views/chatroom/chatroom.component";
import {CallroomComponent} from "./views/callroom/callroom.component";


const routes: Routes = [
  {
    path: '', component: ChatroomComponent
  },
  {
    path: 'room/:roomId', component: ChatroomComponent
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
