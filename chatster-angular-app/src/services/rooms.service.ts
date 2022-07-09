import {Inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {map, Observable} from 'rxjs';

import {arrayRemove, arrayUnion} from "@angular/fire/firestore";
import {Message} from "../models/message.model";
import {Room} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(@Inject(AngularFirestore) protected firestore: AngularFirestore,) {
  }

  public createNewRoom(newRoomData: Room, userIds: string[]) {
    this.firestore.collection('rooms').add(newRoomData).then((newRoomReference)=>{
      for (const userId of userIds) {
        this.firestore.collection('users').doc(userId).update({
          rooms: arrayUnion(newRoomReference.id)
        });
      }
    });
    // how to add subcollections, might need later
    /* this.firestore.collection('rooms').add(newRoomData).then((newRoomReference)=>{
       this.firestore.collection('rooms').doc(newRoomReference.id).collection('members').add(members);
       this.firestore.collection('rooms').doc(newRoomReference.id).collection('recent_message').add({
       });
     });*/
  }

  public getRooms() {
    return this.firestore.collection('rooms')
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <Room>{
            id: snap.payload.doc.id,
            ...(snap.payload.doc.data() as Room)
          }
        })
      }))
  }

  public getOneRoom(roomId: string): Observable<Room> {
    const roomsDocuments = this.firestore.doc<Room>('rooms/' + roomId);
    return roomsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return {id, ...(data as Room)};
        }))
  }

  public editRoom(roomId: string, editedRoomData: Room) {
    this.firestore.collection('rooms').doc(roomId).update(editedRoomData);
  }

  public deleteRoom(roomId: string) {
    this.firestore.collection('rooms').doc(roomId).delete().then((e)=>
    console.log(e));
  }

  public addRoomMember(userId: string, roomId: string) {
    this.firestore.collection('rooms').doc(roomId).update({
      members: arrayUnion(userId)
    });
  }

  public removeRoomMember(userId: string, roomId: string) {
    this.firestore.collection('rooms').doc(roomId).update({
      members: arrayRemove(userId)
    });
  }

  public updateRecentMessage(roomId: string, recentMessage: Message) {
    this.firestore.collection('rooms').doc(roomId).update({recent_message: recentMessage});
  }

}



