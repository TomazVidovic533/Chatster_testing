import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {Observable, shareReplay} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {Condition} from "../../../../core/models/condition";

@Component({
  selector: 'app-rooms-overview',
  templateUrl: './rooms-overview.component.html',
  styleUrls: ['./rooms-overview.component.css']
})
export class RoomsOverviewComponent implements OnInit,OnDestroy {

  rooms$!: Observable<Room[]>;
  room$!: Observable<Room>;

  searchCondition!: Condition;

  constructor(private roomService:RoomService) {}

  ngOnInit(): void {
/*    this.rooms$ =  this.roomService.listWhere('is_group','==',true).pipe(shareReplay(1));
    this.rooms$.subscribe((res)=>{console.log("list", res)});*/

    this.searchCondition = {
      fieldName: 'is_group',
      operator: '==',
      value: true
    } as Condition;
  }

  ngOnDestroy(){
  }

}
