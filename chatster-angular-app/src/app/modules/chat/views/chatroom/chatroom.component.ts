import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {UsersService} from "../../../people/services/users.service";
import {RoomService} from "../../../rooms/services/room.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  usersRooms$!: Observable<Room[]>;

  constructor(private roomsService: RoomService) {
  }

  ngOnInit(): void {
    let id = localStorage.getItem('myUserId');
    if (id) {
      this.usersRooms$=this.roomsService.getUsersRooms(id);
      this.usersRooms$.subscribe();
    }
  }
}
