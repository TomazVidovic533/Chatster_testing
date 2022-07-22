import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {UsersService} from "../../../people/services/users.service";
import {RoomService} from "../../../rooms/services/room.service";
import {AuthService} from "../../../auth/services/auth.service";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  usersRooms$!: Observable<any>;

  constructor(private usersService: UsersService, private authService: AuthService, private chatService: ChatService) {
  }

  ngOnInit(): void {
    /*let id = localStorage.getItem('myUserId');
    if (id) {
      this.usersRooms$=this.roomsService.getUsersRooms(id);
      this.usersRooms$.subscribe();
    }*/
  /*  if (id) {
      this.usersRooms$=this.usersService.getUsersRooms(id);
      this.usersRooms$.subscribe((r)=>{
        console.log("wtf",r);
      })
    }*/
    this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
      this.usersRooms$=this.chatService.getRoomsOfUser(user?.id);
    })
  }
}
