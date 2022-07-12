import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommunityOverviewComponent} from "./views/community-overview/community-overview.component";

const routes: Routes = [{
  path: '', component: CommunityOverviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunitiesRoutingModule { }
