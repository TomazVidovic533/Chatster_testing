import {Component, Input, OnInit} from '@angular/core';
import {Video} from "lucide-angular";
import {combineLatest, Observable, of, switchMap, take} from "rxjs";
import {Room} from "../../../../../core/models/room.model";
import {AuthService} from "../../../../auth/services/auth.service";
import {UsersService} from "../../../../people/services/users.service";
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../../rooms/services/room.service";


@Component({
  selector: 'app-call-panel',
  templateUrl: './call-panel.component.html',
  styleUrls: ['./call-panel.component.css']
})
export class CallPanelComponent implements OnInit {

  videocall = Video;

  @Input() roomId!: string | undefined;
  roomData$!: Observable<Room>
  userId!: string | undefined;

  constructor(private roomsService: RoomService,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.authService.getUserData()
    ])
      .subscribe(([room, user]) => {
        // @ts-ignore
        this.roomData$ = this.roomsService.getCurrentRoom(user.id, room['roomId']);
      });
  }

}
