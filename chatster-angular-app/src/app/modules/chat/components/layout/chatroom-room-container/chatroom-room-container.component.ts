import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Room} from "../../../../../core/models/room.model";
import {UsersService} from "../../../../people/services/users.service";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-chatroom-room-container',
  templateUrl: './chatroom-room-container.component.html',
  styleUrls: ['./chatroom-room-container.component.css']
})
export class ChatroomRoomContainerComponent implements OnInit {

  usersRooms$!: Observable<Room[]>;

  selectedRoom!: BehaviorSubject<string>;


  constructor(private usersService: UsersService,private chatService:ChatService) {
  }

  ngOnInit(): void {
    let id = localStorage.getItem('myUserId');
    if (id) {
      this.usersRooms$ = this.usersService.getUsersRooms(id);
      this.usersRooms$.subscribe((res)=>{
        console.log('users rooms', res)
      })
    }

  }
}
