import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../../core/services/firestore.service";
import {Room} from "../../../core/models/room.model";
import {Router} from "@angular/router";
import {arrayRemove, arrayUnion, documentId} from "@angular/fire/firestore";
import {user} from "@angular/fire/auth";
import {map, take} from "rxjs";
import {User} from "../../../core/models/user.model";
import {Contact} from "../../../core/models/contact.model";


@Injectable({providedIn: 'root'})
export class RoomService extends FirestoreService<Room> {
  constructor(private firestore: AngularFirestore, private router: Router) {
    super("rooms", firestore);
  }

  startConversation(roomData: Room, otherUserData: User, myUserData: User) {
    this.firestore.collection('users').doc(myUserData.id)
      .collection('contacts').doc(otherUserData.id)
      .snapshotChanges().pipe(take(1)).subscribe(userContact => {
      if (userContact.payload.exists) {
        //const data = userContact.payload.data() as any;
        this.router.navigate(['/app/chat/']);
      } else {
        this.add(roomData).then((newRoomReference) => {

          if (newRoomReference.id != null) {
            this.addRoomToUser(otherUserData,newRoomReference.id, false);
            this.addRoomToUser(myUserData, newRoomReference.id, false);

            this.addUserToRoom(otherUserData, newRoomReference.id);
            this.addUserToRoom(myUserData, newRoomReference.id);

            this.addContact(myUserData, otherUserData, newRoomReference.id);
            this.addContact(otherUserData, myUserData, newRoomReference.id);
          }
          this.router.navigate(['/app/chat/' + newRoomReference.id]);
        });
      }
    });
  }

  joinRoom(roomData: Room, user: User) {
    if (roomData.id != null) {
      this.addRoomToUser(user, roomData.id, true);
      this.addUserToRoom(user, roomData.id);
    }
    this.router.navigate(['/app/chat/' + roomData.id]);
  }

  private addRoomToUser(myUser: User, newRoomReferenceId: string, isGroup: boolean) {
    this.firestore.collection('users').doc(myUser.id).collection('rooms').doc(newRoomReferenceId).set({
      is_group: isGroup
    })
  }

  private addUserToRoom(user: User, newRoomReferenceId: string) {
    this.firestore.collection('rooms').doc(newRoomReferenceId).collection('members').doc(user.id).set({
      is_member: true
    })
  }

  private addContact(myUser: User, otherUser: User, newRoomReferenceId: string) {
    this.firestore.collection('users').doc(myUser.id).collection('contacts').doc(otherUser.id).set({
      room_id: newRoomReferenceId
    })
  }

  getUsersRooms(userId: string) {
    return this.listWhere('members', 'array-contains', userId);
  }

  leaveRoom(roomId: string, userId: string) {
    /* this.firestore.collection('rooms').doc(roomId).update({
       members: arrayRemove(userId)
     });*/
    this.deleteSubCollectionDocument(roomId,'members', userId);
    this.firestore.collection('users').doc(userId).collection('rooms').doc(roomId).delete();
    this.router.navigate(['/app/chat/' + roomId]);
  }

  getCurrentRoom(userId: string | undefined, roomId: string | undefined){
    return this.firestore.collection('users').doc(userId).collection('rooms').doc(roomId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            const data = doc.payload.data() as any;
            const id = doc.payload.id;
            return {id, ...data};
          }
        })
      );
  }


}
