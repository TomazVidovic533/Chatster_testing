import {Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, Subscription, switchMap, take} from "rxjs";
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

  private subscriptions = new Subscription();
  usersRooms$!: Observable<any>;
  userRooms: any;

  constructor(private usersService: UsersService, private authService: AuthService, private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.usersRooms$ = this.authService.getUserData().pipe(
      switchMap(user => combineLatest([
        this.usersService.getRoomsOfUser(user?.id),
        this.usersService.getUsersContacts(user?.id)
      ])),
      map(([rooms, contacts]) => {
        let combined = [...rooms, ...contacts];
        let mappedContacts = [];
        for (const element of combined) {
          mappedContacts.push({
            id: (element.room_id ? element.room_id : element.id),
            avatar: (element.userData ? element.userData.avatar : element.roomData.avatar),
            name: (element.userData ? element.userData.name : element.roomData.name),
            user_id: (element.room_id ? element.id : null)
          })
        }
        return mappedContacts;
      })
    );
    this.subscriptions.add(this.usersRooms$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}


/*  return {
    id: (o.room_id ? o.room_id: o.id),
    avatar: (o.userData ? o.userData.avatar: o.roomData.avatar),
    name: (o.userData ? o.userData.name: o.roomData.name)
  }*/
/*  this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
    this.chatService.getUsersActiveRoomsAndContacts(user?.id);
  })*/

/*this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
  this.usersRooms$=this.chatService.getRoomsOfUser(user?.id);
})*/

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
