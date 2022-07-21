import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../../core/services/firestore.service";
import {Room} from "../../../core/models/room.model";
import {Router} from "@angular/router";
import {arrayRemove, arrayUnion} from "@angular/fire/firestore";
import {user} from "@angular/fire/auth";


@Injectable({ providedIn: 'root' })
export class RoomService extends FirestoreService<Room> {
  constructor(private firestore: AngularFirestore, private router: Router) {
    super("rooms", firestore);
  }

  startConversation(roomData: Room, userIds: string[]){
      this.add(roomData).then((newRoomReference)=>{
        for (const userId of userIds) {
          this.firestore.collection('users').doc(userId)
            .collection('rooms').doc(newRoomReference.id).set({
            avatar: roomData.avatar,
            name: roomData.name,
            recent_message: ''
          })
          this.firestore.collection('rooms').doc(newRoomReference.id).update({
            members: arrayUnion(userId)
          });
        }
        this.router.navigate(['/app/chat/'+newRoomReference.id]);
      });
  }

  joinRoom(roomId: string, userId: string) {
    this.firestore.collection('rooms').doc(roomId).update({
      members: arrayUnion(userId)
    });
    this.firestore.collection('users').doc(userId).collection('rooms').doc(roomId).set({
      is_member: true
    })
    this.router.navigate(['/app/chat/'+roomId]);
  }


  getUsersRooms(userId: string){
    return this.listWhere('members','array-contains', userId);
  }

  leaveRoom(roomId: string, userId: string) {
    this.firestore.collection('rooms').doc(roomId).update({
      members: arrayRemove(userId)
    });
    this.firestore.collection('users').doc(userId).collection('rooms').doc(roomId).set({
      is_member: false
    })
    this.router.navigate(['/app/chat/'+roomId]);
  }
}
