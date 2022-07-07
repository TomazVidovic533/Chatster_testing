import {Inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {from, map, Observable} from 'rxjs';
import {Room} from "../models/room.model";
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(@Inject(AngularFirestore) protected firestore: AngularFirestore,) {
  }

  public addRoom(name: string, avatar: string, bio: string, usersIds: string[]) {
    let members: { [key: string]: boolean } = {};
    for (const userId of usersIds) {
      members[userId] = true;
    }
    this.firestore.collection("rooms").add({
      name: name,
      bio: bio,
      avatar: avatar,
      created_at: new Date().getTime(),
      is_private: true,
      is_community: false,
      max_members: 2,
      members: members,
      recent_message: {
        created_at: null,
        sent_by: null,
        message: null
      }
    }).then((e) => {
      console.log(e)
    })
  }

  public getRooms(){
    return this.firestore.collection('rooms')
      .snapshotChanges()
      .pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Room>{
          id:snap.payload.doc.id,
          ...(snap.payload.doc.data() as Room)
        }
      })
    }))
  }

  public getOneRoom(roomId: string): Observable<Room> {
    const productsDocuments = this.firestore.doc<Room>('rooms/' + roomId);
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...(data as Room) };
        }))
  }

  public editRoom() {
  }

  public removeRoom() {

  }

  public addRoomMember() {

  }

  public updateRecentMessage() {

  }

}



