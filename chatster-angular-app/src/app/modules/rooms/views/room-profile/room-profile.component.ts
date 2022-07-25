import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";
import {AuthService} from "../../../auth/services/auth.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.css']
})
export class RoomProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private authService: AuthService,
              private translateService: TranslateService,
              private router: Router) {
  }

  roomMembers$!: Observable<Room[]>;
  roomData$!: Observable<Room>;
  roomObject!: Room;
  myId!: string | undefined;
  roomId!: string | null;

  createdAtLabel!: string;
  typeLabel!: string;
  bioLabel!: string;
  privateRoomLabel!: string;
  publicRoomLabel!: string;

  isViewingUserMember: boolean = true;

  ngOnInit(): void {
    // @ts-ignore
    this.authService.getUserData().pipe(take(1)).subscribe((user) => {
      this.myId = user?.id
    })

    this.roomId = this.route.snapshot.paramMap.get('roomId')

    this.translateService.get(['profile.created_at', 'profile.bio', 'profile.public_room', 'profile.private_room', 'profile.type'])
      .subscribe(translations => {
        this.createdAtLabel = translations['profile.created_at'];
        this.bioLabel = translations['profile.bio'];
        this.typeLabel = translations['profile.type'];
        this.publicRoomLabel = translations['profile.public_room'];
        this.privateRoomLabel = translations['profile.private_room'];
      });

    if (this.roomId) {
      this.roomData$ = this.roomService.get(this.roomId);
      this.roomData$.subscribe((roomObject) => {
        this.roomObject = roomObject;
      });
    }
  }

  joinRoom(event: Event) {
    if (this.roomId != null) {
      this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
        if (myUserData) {
          this.roomService.joinRoom(this.roomObject, myUserData);
        }
      })
    }
  }

  requestAccessToRoom(event: Event) {
    if (this.roomId != null) {
      this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
        if (myUserData) {
          this.roomService.requestAccess(this.roomObject, myUserData);
        }
      })
    }
  }

  leaveRoom(event: Event) {
    if (this.roomId != null) {
      if (typeof this.myId === "string") {
        this.roomService.leaveRoom(this.roomId, this.myId);
      }
    }
  }

  delete(event: Event) {
    if (this.roomId != null) {
      this.roomService.delete(this.roomId);
      this.router.navigate(['/app/rooms']);
    }
  }


  deleteFile(event: Event, id: string) {
    console.log("deletem", id)
  }

}
