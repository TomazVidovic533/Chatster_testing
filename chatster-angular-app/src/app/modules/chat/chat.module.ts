import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMessageFormComponent } from './components/send-message-form/send-message-form.component';
import { RoomsListviewComponent } from './components/rooms-listview/rooms-listview.component';

@NgModule({
  declarations: [
    SendMessageFormComponent,
    RoomsListviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }
