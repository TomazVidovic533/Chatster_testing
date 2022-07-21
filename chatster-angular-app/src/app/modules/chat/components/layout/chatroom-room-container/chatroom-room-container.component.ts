import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Room} from "../../../../../core/models/room.model";
import {UsersService} from "../../../../people/services/users.service";
import {ChatService} from "../../../services/chat.service";
import {RoomService} from "../../../../rooms/services/room.service";

@Component({
  selector: 'app-chatroom-room-container',
  templateUrl: './chatroom-room-container.component.html',
  styleUrls: ['./chatroom-room-container.component.css']
})
export class ChatroomRoomContainerComponent implements OnInit {

  rooms$!: Observable<Room[]>;

  constructor(private roomsService: RoomService,private chatService:ChatService) {
  }

  ngOnInit(): void {
    let id = localStorage.getItem('myUserId');
    if (id) {
      this.rooms$=this.roomsService.getUsersRooms(id);
      this.rooms$.subscribe((r)=>{
        console.log("wtf",r);
      })
    }

  }
}
