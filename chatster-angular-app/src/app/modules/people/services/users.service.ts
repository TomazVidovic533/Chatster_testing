import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {LoggedUser, User} from "../../../core/models/user.model";
import {user} from "@angular/fire/auth";
import {map} from "rxjs";
import {Room} from "../../../core/models/room.model";

@Injectable({providedIn: 'root'})
export class UsersService extends FirestoreService<User> {
  constructor(private firestore: AngularFirestore) {
    super("users", firestore);
  }

  getUsersRooms(userId: string) {
    return this.firestore.collection('users').doc(userId).collection('rooms')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Room;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getUsersRoomsIds(userId: string){
    return this.firestore.collection('users').doc(userId).collection('rooms')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            return a.payload.doc.id;
          });
        })
      );
  }

}
