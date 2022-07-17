import {Component, OnInit} from '@angular/core';
import {first, Observable} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../rooms/services/room.service";
import {Room} from "../../../../core/models/room.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UsersService, private roomsService: RoomService) {
  }

  userData$!: Observable<User>;
  userObj!: User;
  id!:string | null;
  myId!:string | null;

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('userId');
    this.myId = localStorage.getItem('myUserId')

    if (this.id) {
      this.userData$ = this.userService.get(this.id);
      this.userData$.subscribe((u)=>{
        this.userObj=u;
      });
    }
  }

  startConversation(event: Event) {
    if(this.id){
      // @ts-ignore
      let userIds: string [] = [this.userObj.id,localStorage.getItem('myUserId')];
      let r={
        name: this.userObj.name,
        is_private: true,
        is_group: false,
        recent_message: '',
        created_at: new Date().getTime(),
        avatar: this.userObj.avatar
      } as Room;
      console.log(this.userObj);
      console.log("res",r);
      this.roomsService.startConversation(r, userIds)
    }
  }

}
