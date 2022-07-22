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
  tap, zip
} from "rxjs";
import {Room} from "../../../../core/models/room.model";
import {MappedMessage, Message} from "../../../../core/models/message.model";
import {ChatService} from "../../services/chat.service";
import {RoomService} from "../../../rooms/services/room.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  id!: string | null;
  chatMessages$!: Observable<MappedMessage[]>;
  roomData$!: Observable<Room>;
  roomId!: string
  test$!: any
  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              private roomsService: RoomService,
              private auth: AuthService) {
  }

  ngOnInit(): void {


    this.chatMessages$ = this.route.params.pipe(
      switchMap(params => {
        return this.chatService.getMappedRoomMessages(params['roomId']);
      })
    )


    this.route.params.pipe(
      switchMap(typeId => combineLatest([
        this.chatService.getIds(typeId['roomId']),
        this.chatService.getMessages(typeId['roomId'])
      ]))
    )
      .subscribe(([ids, m]) => {
        console.log("view ids", ids)
        console.log("view m", m)
      });



/*    this.chatMessages$ = this.route.params.pipe(
      switchMap(params => {
        this.roomId = params['roomId'];
        return this.chatService.getChatRoomMessages(params['roomId']);
      })
    );*/

    this.roomData$ = this.route.params.pipe(
      switchMap(params => {
        this.roomId = params['roomId'];
        return this.roomsService.get(params['roomId']);
      })
    );

    this.chatMessages$.subscribe();
    this.roomData$.subscribe();

    /*    this.route.params.pipe(
          switchMap(typeId => combineLatest([
            this.typesService.getProjectsByType(typeId),
            this.typesService.getProgramsByType(typeId)
          ]))
        )
          .subscribe(([projects, programs]) => {
            // ...
          });*/

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


  }

  ngOnDestroy() {
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
