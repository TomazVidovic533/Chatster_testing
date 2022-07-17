import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../../core/services/firestore.service";
import {Room} from "../../../core/models/room.model";
import {Router} from "@angular/router";
import {arrayUnion} from "@angular/fire/firestore";


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

}
