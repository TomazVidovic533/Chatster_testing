import {Component, Input, OnInit} from '@angular/core';
import {Video} from "lucide-angular";
import {Observable, switchMap, take} from "rxjs";
import {Room} from "../../../../../core/models/room.model";
import {AuthService} from "../../../../auth/services/auth.service";
import {UsersService} from "../../../../people/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../../rooms/services/room.service";
import {CallService} from "../../../services/call.service";


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
              private router: Router,
              private callService: CallService) {
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
    this.authService.getUserData().pipe(take(1)).subscribe((myUserData)=>{
      this.callService.createNewCallRoom(<string>myUserData?.id, 'otherid');
      this.router.navigate(['/app/chat/call/id']);
    })

  }

}
