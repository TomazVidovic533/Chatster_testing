import {Component, OnInit} from '@angular/core';
import {map, Observable, switchMap, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";
import {AuthService} from "../../../auth/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {TableDataItem} from "../../../../core/models/table-data-item.model";
import {RoomsFilesService} from "../../services/rooms-files.service";


@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.css']
})
export class RoomProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private roomFilesService: RoomsFilesService,
              private authService: AuthService,
              private translateService: TranslateService,
              private router: Router) {
  }

  roomRequests$!: Observable<TableDataItem[]>;
  roomFilesShared$!: Observable<TableDataItem[]>;

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

  isViewingUserMember: boolean = false;

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

      this.roomRequests$ = this.roomService.getPrivateRoomsRequests(this.roomId).pipe(
        map(data => {
          return data.map((element: any) => {
            return {
              id: element.id,
              avatar: element.userData.avatar,
              name: element.userData.name,
            };
          });
        }));
      this.roomRequests$.subscribe((res)=>{
        console.log("requesti",res)
      })

      this.roomFilesShared$ = this.roomFilesService.getSharedFilesInRoom(this.roomId).pipe(
        map(data => {
          return data.map((element: any) => {
            return {
              id: element.id,
              url: element.fileData.url,
              name: element.fileData.name,
            };
          });
        }));

      this.roomFilesShared$.subscribe((res)=>{
        console.log("shared",res)
      })



      this.roomMembers$ = this.roomService.getRoomsMembers(this.roomId).pipe(
        map(data => {
          return data.map((element: any) => {
            return {
              id: element.id,
              avatar: element.userData.avatar,
              name: element.userData.name,
            };
          });
        }));

      this.roomMembers$.subscribe((members)=>{
        console.log("mem",members)
        for(var i = 0; i < members.length; i++) {
          if (members[i].id == this.myId) {
            this.isViewingUserMember = true;
            break;
          }
        }
      })

      console.log("ismem",this.isViewingUserMember)

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


  viewProfile(event: Event, id: string){
    console.log("view profile", id)
  }

  goToUrl(event: Event, url: string) {
    window.location.href = url;
  }

  deleteFile(event: Event, id: string) {
    console.log("delete file", id)
  }

  acceptRequest(event: Event, id: string) {
    console.log("accept", id)
  }

  deleteRequest(event: Event, id: string) {
    console.log("delete request", id)
  }

  memberSelected(itemClicked: Event, itemId: string) {
    this.router.navigate(['/app/people/'+itemId]);
  }
}
