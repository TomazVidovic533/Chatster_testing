import {Component, OnInit} from '@angular/core';
import {TestroomService} from "../../services/testroom.service";
import {RoomsService} from "../../services/rooms.service";
import {Observable} from "rxjs";
import {Room} from "../../models/room.model";
import {user} from "@angular/fire/auth";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  rooms$!: Observable<any>;
  room$!: Observable<any>;

  todos$!: Observable<Room[]>;

  constructor(private roomService: RoomsService, private t:TestroomService) {
  }

  ngOnInit(): void {
    this.rooms$ = this.roomService.getRooms();
    console.log(this.rooms$)

    this.room$ = this.roomService.getOneRoom('g07N4g3iYGfG9uyElIJg');
    console.log(this.room$)

    this.todos$ = this.t.list();
  }

  setValue(name: string, avatar: string, bio: string) {
    let userIds: string[] = ['a', 'b'];
    let newRoomData: Room = {
      name: name,
      bio: bio,
      avatar: avatar,
      created_at: new Date().getTime(),
      is_private: true,
      is_community: false,
      max_members: 2,
      recent_message: {},
      members: userIds
    }
    this.roomService.createNewRoom(newRoomData, userIds);
  }

  edit(id: string, name: string, avatar: string, bio: string) {
    let userIds: string[] = ['a', 'b'];
    let newRoomData: Room = {
      name: name,
      bio: bio,
      avatar: avatar,
      created_at: new Date().getTime(),
      is_private: true,
      is_community: false,
      max_members: 2,
      recent_message: {},
      members: userIds
    }
    this.roomService.editRoom(id, newRoomData);
  }

  del(id: string) {
    this.roomService.deleteRoom(id);
  }

}
