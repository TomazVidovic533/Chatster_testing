import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunitiesRoutingModule } from './communities-routing.module';
import {CommunityOverviewComponent} from "./views/community-overview/community-overview.component";


@NgModule({
  declarations: [
    CommunityOverviewComponent
  ],
  imports: [
    CommonModule,
    CommunitiesRoutingModule
  ]
})
export class CommunitiesModule { }
