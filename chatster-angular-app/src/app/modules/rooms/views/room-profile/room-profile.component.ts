import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";


@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.css']
})
export class RoomProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router) {
  }

  roomData$!: Observable<Room>;
  myId!: string;
  roomId!: string | null;

  ngOnInit(): void {
    // @ts-ignore
    this.myId = localStorage.getItem('myUserId');

    this.roomId = this.route.snapshot.paramMap.get('roomId')

    if (this.roomId) {
      this.roomData$ = this.roomService.get(this.roomId);
      this.roomData$.subscribe();
    }
  }

  joinRoom(event: Event) {
    if (this.roomId != null) {
      this.roomService.joinRoom(this.roomId, this.myId);
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
