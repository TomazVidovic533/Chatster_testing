import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import {UsersOverviewComponent} from "./views/users-overview/users-overview.component";


@NgModule({
  declarations: [
    UsersOverviewComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
