import {Component, Input, OnInit} from '@angular/core';
import {Video} from "lucide-angular";
import {Observable, switchMap} from "rxjs";
import {Room} from "../../../../../core/models/room.model";
import {AuthService} from "../../../../auth/services/auth.service";
import {UsersService} from "../../../../people/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../../rooms/services/room.service";


@Component({
  selector: 'app-call-panel',
  templateUrl: './call-panel.component.html',
  styleUrls: ['./call-panel.component.css']
})
export class CallPanelComponent implements OnInit {

  videocall = Video;

  @Input() elementId!: string | undefined;
  roomData$!: Observable<Room>


  constructor(private roomsService: RoomService,
              private authService: AuthService,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.roomData$ = this.route.params.pipe(
      switchMap(params => {
        return this.roomsService.get(params['roomId']);
      })
    );

    this.roomData$.subscribe((res)=>{
      console.log("room data", res);
    });
  }

  createCallRoom(){
    console.log("create callroom")
    this.router.navigate(['/app/chat/call/id']);
  }

}
