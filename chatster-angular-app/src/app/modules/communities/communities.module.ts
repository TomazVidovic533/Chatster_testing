import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityOverviewComponent } from './views/community-overview/community-overview.component';
import { MembersListviewComponent } from './components/members-listview/members-listview.component';
import { RoomsListviewComponent } from './components/rooms-listview/rooms-listview.component';
import { PostsListviewComponent } from './components/posts-listview/posts-listview.component';
import { CreatePostFormComponent } from './components/create-post-form/create-post-form.component';
import { CreateRoomFormComponent } from './components/create-room-form/create-room-form.component';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { CreateRoomComponent } from './views/create-room/create-room.component';
import { CommunityProfileComponent } from './views/community-profile/community-profile.component';



@NgModule({
  declarations: [
    CommunityOverviewComponent,
    MembersListviewComponent,
    RoomsListviewComponent,
    PostsListviewComponent,
    CreatePostFormComponent,
    CreateRoomFormComponent,
    CreatePostComponent,
    CreateRoomComponent,
    CommunityProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommunitiesModule { }
