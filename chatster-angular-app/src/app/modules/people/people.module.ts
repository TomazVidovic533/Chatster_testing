import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import {UsersOverviewComponent} from "./views/users-overview/users-overview.component";
import {UserProfileComponent} from "./views/user-profile/user-profile.component";
import {ProfileHeaderComponent} from "../../shared/components/profile-header/profile-header.component";
import {
  ProfileInformationItemComponent
} from "../../shared/components/profile-information-item/profile-information-item.component";
import {SharedModule} from "../../shared/shared.module";
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    UsersOverviewComponent,
    UserProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule
  ]
})
export class PeopleModule { }
