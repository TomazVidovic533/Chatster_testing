import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";
import {AuthService} from "../../../auth/services/auth.service";


@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.css']
})
export class RoomProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private authService: AuthService,
              private router: Router) {
  }

  roomData$!: Observable<Room>;
  roomObject!: Room;
  myId!: string;
  roomId!: string | null;

  ngOnInit(): void {
    // @ts-ignore
    this.myId = localStorage.getItem('myUserId');

    this.roomId = this.route.snapshot.paramMap.get('roomId')

    if (this.roomId) {
      this.roomData$ = this.roomService.get(this.roomId);
      this.roomData$.subscribe((roomObject)=>{
        this.roomObject=roomObject;
      });
    }
  }

  joinRoom(event: Event) {
    if (this.roomId != null) {
      this.authService.getUserData().pipe(take(1)).subscribe((myUserData)=>{
        if (myUserData) {
          this.roomService.joinRoom(this.roomObject, myUserData);
        }
      })
    }
  }

  leaveRoom(event: Event){
    if (this.roomId != null) {
      this.roomService.leaveRoom(this.roomId, this.myId);
    }
  }

  delete(event: Event) {
    if (this.roomId != null) {
      this.roomService.delete(this.roomId);
      this.router.navigate(['/app/rooms']);
    }
  }



}
