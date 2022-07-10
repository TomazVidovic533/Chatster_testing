import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { UsersOverviewComponent } from './views/users-overview/users-overview.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersListviewComponent } from './components/users-listview/users-listview.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    UsersOverviewComponent,
    UserCardComponent,
    UsersListviewComponent,
    UserProfileCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PeopleModule { }
