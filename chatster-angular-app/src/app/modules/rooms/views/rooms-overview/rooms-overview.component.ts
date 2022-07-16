import {Component, OnDestroy, OnInit} from '@angular/core';
import{User} from "../../../../core/models/user.model";
import {Room} from "../../../../../models/room.model";
import {RoomService} from "../../services/room.service";
import {Observable, shareReplay} from "rxjs";

@Component({
  selector: 'app-rooms-overview',
  templateUrl: './rooms-overview.component.html',
  styleUrls: ['./rooms-overview.component.css']
})
export class RoomsOverviewComponent implements OnInit,OnDestroy {

  rooms$!: Observable<Room[]>;
  room$!: Observable<Room>;

  constructor(private roomService:RoomService) {}

  ngOnInit(): void {
    this.rooms$ =  this.roomService.list().pipe(shareReplay(1));
    this.rooms$.subscribe((res)=>{console.log("list", res)});
  }

  ngOnDestroy(){
  }

}
