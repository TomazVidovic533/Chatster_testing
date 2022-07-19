import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  combineLatest,
  distinctUntilChanged,
  first,
  forkJoin,
  map,
  mergeMap,
  Observable,
  Subscription,
  switchMap,
  take,
  tap
} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {Message} from "../../../../core/models/message.model";
import {ChatService} from "../../services/chat.service";
import {RoomService} from "../../../rooms/services/room.service";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  id!: string | null;

  @Input() roomData$!: Observable<Room>;

  chatMessages!: Observable<Message[]>;
  room$!: Observable<Room>;

  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              private roomsService: RoomService) {
  }

  ngOnInit(): void {
    this.chatMessages = this.route.params.pipe(
      switchMap(params => {
          return this.chatService.getChatRoomMessages(params['roomId']);
      })
    );

/*
    this.room$ = this.route.params.pipe(
      switchMap(params => {
        return this.roomsService.get(params['roomId']);
      })
    );

    this.room$.subscribe((res)=>{
      console.log("room data", res);
    });
*/

    this.chatMessages.subscribe((res)=>{
      console.log("r meessages", res);
    });
  }

  ngOnDestroy(){
    //this.chatMessages.subscribe().unsubscribe();
  }
}


/*    this.route.params.pipe(
      map(params => params['roomId']),
    ).subscribe(changedParam => {
     // console.log(`reacting to single param change ${changedParam}`);
      if(changedParam){
/!*        this.messages$ = this.chatService.getChatRoomMessages('TDdWM7XZ9j0gbX9HsoCE');
        this.messages$.subscribe((m)=>{
          console.log("messages",m);
        });*!/

        this.chatService.roomId$.next(changedParam);
      }
    })
    this.messages$ = this.chatService.getChatRoomMessages(this.chatService.roomId$.value).subscribe();*/
//  console.log(this.chatService.roomId$.value)
