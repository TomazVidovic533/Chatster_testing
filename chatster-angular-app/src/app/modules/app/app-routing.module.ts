import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from "../home/views/overview/overview.component";
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
        path: 'communities',
        loadChildren: () => import('../../modules/communities/communities.module').then(m => m.CommunitiesModule)
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
