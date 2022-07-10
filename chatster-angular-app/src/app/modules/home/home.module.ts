import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './views/overview/overview.component';
import { HistoryListviewComponent } from './components/history-listview/history-listview.component';
import { MyRoomsHorizontalListviewComponent } from './components/my-rooms-horizontal-listview/my-rooms-horizontal-listview.component';
import { MyCommunitiesHorizontalListviewComponent } from './components/my-communities-horizontal-listview/my-communities-horizontal-listview.component';
import { TrendingPostsComponent } from './components/trending-posts/trending-posts.component';



@NgModule({
  declarations: [
    OverviewComponent,
    HistoryListviewComponent,
    MyRoomsHorizontalListviewComponent,
    MyCommunitiesHorizontalListviewComponent,
    TrendingPostsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
