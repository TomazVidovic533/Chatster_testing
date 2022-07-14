import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import {UsersOverviewComponent} from "./views/users-overview/users-overview.component";
import {UserProfileComponent} from "./views/user-profile/user-profile.component";
import {ProfileHeaderComponent} from "../../shared/components/profile-header/profile-header.component";
import {
  ProfileInformationSectionComponent
} from "../../shared/components/profile-information-section/profile-information-section.component";
import {
  ProfileInformationItemComponent
} from "../../shared/components/profile-information-item/profile-information-item.component";

@NgModule({
  declarations: [
    UsersOverviewComponent,
    UserProfileComponent,
    ProfileHeaderComponent,
    ProfileInformationSectionComponent,
    ProfileInformationItemComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
