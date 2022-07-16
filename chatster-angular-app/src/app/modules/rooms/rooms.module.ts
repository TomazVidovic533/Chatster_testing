import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsOverviewComponent } from './views/rooms-overview/rooms-overview.component';

import {SharedModule} from "../../shared/shared.module";
import { RoomProfileComponent } from './views/room-profile/room-profile.component';
import { RoomEditComponent } from './views/room-edit/room-edit.component';
import { RoomAddComponent } from './views/room-add/room-add.component';
import { CreateRoomFormComponent } from './components/create-room-form/create-room-form.component';
import { EditRoomFormComponent } from './components/edit-room-form/edit-room-form.component';

@NgModule({
  declarations: [
    RoomsOverviewComponent,
    RoomProfileComponent,
    RoomEditComponent,
    RoomAddComponent,
    CreateRoomFormComponent,
    EditRoomFormComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule
  ]
})
export class RoomsModule { }
