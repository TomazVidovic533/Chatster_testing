import {Component, OnInit} from '@angular/core';
import {RoomsService} from "../../services/rooms.service";
import {Observable} from "rxjs";
import {Room} from "../../models/room.model";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  rooms$!: Observable<any>;
  room$!: Observable<any>;

  constructor(private roomService: RoomsService) {
  }

  ngOnInit(): void {
    this.rooms$ = this.roomService.getRooms();
    console.log(this.rooms$)

    this.room$ = this.roomService.getOneRoom('g07N4g3iYGfG9uyElIJg');
    console.log(this.room$)
  }

  setValue(name: string, avatar: string, bio: string) {
    let userIds: string[] = ['prvi user', 'drugi'];
    this.roomService.addRoom(name, avatar, bio, userIds);
  }

}
