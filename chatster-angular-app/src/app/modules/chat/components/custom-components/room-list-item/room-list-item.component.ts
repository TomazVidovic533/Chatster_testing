import {Component, Input, OnInit} from '@angular/core';
import {Room, RoomItem} from "../../../../../core/models/room.model";
import {BehaviorSubject} from "rxjs";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.css']
})
export class RoomListItemComponent implements OnInit {

  @Input() roomData!: RoomItem;

  constructor() { }

  ngOnInit(): void {

    console.log("room-list-item", this.roomData)
  }


}
