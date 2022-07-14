import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppViewComponent} from "./views/app-view/app-view.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AppViewComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../../modules/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'people',
        loadChildren: () => import('../../modules/people/people.module').then(m => m.PeopleModule)
      },
      {
        path: 'rooms',
        loadChildren: () => import('../../modules/rooms/rooms.module').then(m => m.RoomsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../modules/people/people.module').then(m => m.PeopleModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
