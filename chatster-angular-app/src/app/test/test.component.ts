import {Component, OnInit} from '@angular/core';
import {RoomsService} from "../../services/rooms.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private roomService: RoomsService) {
  }

  ngOnInit(): void {
  }

  setValue(name: string, avatar: string, bio: string) {
    let userIds: string[] = ['prvi user', 'drugi'];
    this.roomService.addRoom(name, avatar, bio, userIds);
  }

}
