import {Component, OnInit} from '@angular/core';
import {first, Observable, switchMap, take} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../rooms/services/room.service";
import {Room} from "../../../../core/models/room.model";
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private roomsService: RoomService,
              private authService: AuthService) {
  }

  userData$!: Observable<User>;
  userObj!: User;
  id!: string | null;
  myId!: string | null;

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('userId');
    this.myId = localStorage.getItem('myUserId')

    if (this.id) {
      this.userData$ = this.userService.get(this.id);
      this.userData$.subscribe((user) => {
        this.userObj = user;
      });
    }
  }

  startConversation(event: Event) {
    this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
      if (myUserData) {
        this.roomsService.startConversation({
          name: this.userObj.name,
          is_private: true,
          is_group: false,
          recent_message: '',
          created_at: Timestamp,
          avatar: this.userObj.avatar
        } as unknown as Room, this.userObj, myUserData);
      }
    })
  }

  edit(event: Event) {

  }

  delete(event: Event) {
    if (this.myId != null) {
      localStorage.removeItem('myUserId')
      this.authService.deleteAccount();
      this.authService.logOut();
    }
  }

}
