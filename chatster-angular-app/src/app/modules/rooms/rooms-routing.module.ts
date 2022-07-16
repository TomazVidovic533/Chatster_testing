import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomsOverviewComponent} from "./views/rooms-overview/rooms-overview.component";
import {RoomProfileComponent} from "./views/room-profile/room-profile.component";
import {RoomEditComponent} from "./views/room-edit/room-edit.component";
import {RoomAddComponent} from "./views/room-add/room-add.component";

const routes: Routes = [{
  path: '', component: RoomsOverviewComponent
},
  {
    path: ':roomId', component: RoomProfileComponent
  },
  {
    path: 'add-room', component: RoomAddComponent
  },
  {
    path: ':roomId/edit', component: RoomEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {
}
