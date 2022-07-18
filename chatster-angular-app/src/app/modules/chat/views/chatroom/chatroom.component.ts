import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {UsersService} from "../../../people/services/users.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  usersRooms$!: Observable<Room[]>;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    let id = localStorage.getItem('myUserId');
    if (id) {
      this.usersRooms$ = this.usersService.getUsersRooms(id);
      this.usersRooms$.subscribe((res) => {
        console.log('users rooms', res)
      })
    }

  }
}
