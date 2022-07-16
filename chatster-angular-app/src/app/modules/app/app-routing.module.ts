import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppViewComponent} from "./views/app-view/app-view.component";
import {AngularFireAuthGuard, canActivate} from '@angular/fire/compat/auth-guard';
import {hasCustomClaim, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import {map} from "rxjs";
import { customClaims } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/sign-in']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['app/home']);
const belongsToAccount = ({next}: { next: any }) => {
  return hasCustomClaim(`account-${next.params.id}`);
};
const onlyAllowSelf = ({next}: { next: any }) => {
  return map(user => {
    // @ts-ignore
    return next.params.userId === user.uid && !!user;
  });
};



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
        loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'chat',
        loadChildren: () => import('../../modules/chat/chat.module').then(m => m.ChatModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'people',
        loadChildren: () => import('../../modules/people/people.module').then(m => m.PeopleModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'rooms',
        loadChildren: () => import('../../modules/rooms/rooms.module').then(m => m.RoomsModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../modules/people/people.module').then(m => m.PeopleModule),
        ...canActivate(redirectUnauthorizedToLogin)
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
