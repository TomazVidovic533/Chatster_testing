import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";


@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.css']
})
export class RoomProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,private roomService: RoomService) {
  }

  roomData$!: Observable<Room>;

  ngOnInit(): void {

    let id=this.route.snapshot.paramMap.get('roomId')

    if(id){
      this.roomData$ = this.roomService.get(id);
      this.roomData$.subscribe();
    }
  }
}
