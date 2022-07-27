import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {Message} from "../../../core/models/message.model";
import {BehaviorSubject, combineLatest, map, Observable, of, Subject, switchMap, take} from "rxjs";

import {UsersService} from "../../people/services/users.service";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends FirestoreService<Message> {

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {
    super("room_messages", firestore);
  }

  private selectedRoomData = new BehaviorSubject('');
  selectedRoom = this.selectedRoomData.asObservable();

  switchRoom(data: any) {
    this.selectedRoomData.next(data)
  }

  sendMessageToRoom(message: Message, roomId: string) {
    this.addSubCollectionDocument(roomId, 'messages', message);
  }

  getChatRoomMessages(roomId: string): Observable<Message[]> {
    return this.listSubCollection(roomId, 'messages');
  }

  getMessages(roomId: string) {
    return this.firestore.collection('room_messages').doc(roomId).collection('messages')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getMappedRoomMessages(roomId: string) {
    return this.collection
      .doc(roomId)
      .collection('messages', ref => ref.orderBy('created_at'))
      .snapshotChanges()
      .pipe(
        map((data: any[]) => data.map((document) => ({
            ...document.payload.doc.data(),
            ...{id: document.payload.doc.id}
          }))
        ),
        switchMap((messages: Message[]) => {
          const membersData$ = messages.map((message) =>
            this.firestore.collection(`users`).doc(message.sent_by).valueChanges()
          );
          return combineLatest([
            of(messages),
            combineLatest(membersData$.length ? membersData$ : [of([])])
          ]);
        }),
        map(([messages, userData]: [Message[], any]) =>
          messages.map((message, i) => {
            return {
              messageData: message,
              userData: userData[i]
            };
          })
        )
      );
  }

}

