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
    this.firestore.collection('users_contacts').doc(myUserData.id)
      .collection('contacts').doc(otherUserData.id)
      .snapshotChanges().pipe(take(1)).subscribe(userContact => {
      if (userContact.payload.exists) {
        this.router.navigate(['/app/chat/']);
      } else {
        this.add(roomData).then((newRoomReference) => {

          if (newRoomReference.id != null) {
            this.addRoomToUser(otherUserData, myUserData, newRoomReference.id, roomData);
            this.addRoomToUser(myUserData, otherUserData, newRoomReference.id, roomData);

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

  private addRoomToUser(otherUser: User, myUser: User, newRoomReferenceId: string, roomData: Room) {
    this.firestore.collection('users').doc(myUser.id).collection('rooms').doc(newRoomReferenceId).set({
      avatar: otherUser.avatar,
      name: otherUser.name,
      recent_message: ''
    })
  }

  private addUserToRoom(user: User, newRoomReferenceId: string) {
    this.firestore.collection('rooms').doc(newRoomReferenceId).collection('members').doc(user.id).set({
      avatar: user.avatar,
      name: user.name
    })
  }

  private addContact(myUser: User, otherUser: User, newRoomReferenceId: string) {
    this.firestore.collection('users_contacts').doc(myUser.id).collection('contacts').doc(otherUser.id).set({
      room_id: newRoomReferenceId
    })
  }

  joinRoom(roomData: Room, user: User) {
    this.firestore.collection('rooms').doc(roomData.id).collection('members').doc(user.id).set({
      avatar: user.avatar,
      name: user.name
    })
    this.firestore.collection('users').doc(user.id).collection('rooms').doc(roomData.id).set({
      avatar: roomData.avatar,
      name: roomData.name,
      recent_message: ''
    })
    this.router.navigate(['/app/chat/' + roomData.id]);
  }


  getUsersRooms(userId: string) {
    return this.listWhere('members', 'array-contains', userId);
  }

  leaveRoom(roomId: string, userId: string) {
    /* this.firestore.collection('rooms').doc(roomId).update({
       members: arrayRemove(userId)
     });*/
    this.firestore.collection('rooms').doc(roomId).collection('members').doc(userId).delete();
    this.firestore.collection('users').doc(userId).collection('rooms').doc(roomId).delete();
    this.router.navigate(['/app/chat/' + roomId]);
  }

  getRoomMembersIds(roomId: string){
    return this.listSubCollection(roomId,'members');
  }


}
