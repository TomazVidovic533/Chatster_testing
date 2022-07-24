import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {Message} from "../../../core/models/message.model";
import {BehaviorSubject, combineLatest, map, Observable, of, switchMap} from "rxjs";
import {RoomService} from "../../rooms/services/room.service";
import {user} from "@angular/fire/auth";
import {zip} from "rxjs/operators";
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends FirestoreService<Message> {

  constructor(private firestore: AngularFirestore) {
    super("room_messages", firestore);

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

  getRoomsOfUser(userId: string | undefined): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('rooms',ref => ref.where('is_group','==', true))
      .snapshotChanges()
      .pipe(
        map((actions: any[]) => actions.map((a) => ({...a.payload.doc.data(), ...{id: a.payload.doc.id}}))),
        switchMap((products: any[]) => {
          const pricesCols$ = products.map((p) =>
            this.firestore
              .collection(`rooms`).doc(p.id)
              .valueChanges()
          );
          return combineLatest([of(products), combineLatest(pricesCols$.length ? pricesCols$ : [of([])])]);
        }),
        map(([products, pricesCols]) =>
          products.map((p, idx) => {
            p.roomData = pricesCols[idx];
            return p;
          })
        )
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

  getUsersContacts(userId: string | undefined): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('contacts')
      .snapshotChanges()
      .pipe(
        map((actions: any[]) => actions.map((a) => ({...a.payload.doc.data(), ...{id: a.payload.doc.id}}))),
        switchMap((products: any[]) => {
          const pricesCols$ = products.map((p) =>
            this.firestore
              .collection(`users`).doc(p.id)
              .valueChanges()
          );
          return combineLatest([of(products), combineLatest(pricesCols$.length ? pricesCols$ : [of([])])]);
        }),
        map(([products, pricesCols]) =>
          products.map((p, idx) => {
            p.userData = pricesCols[idx];
            return p;
          })
        )
      );
  }

  getUsersActiveRoomsAndContacts(userId: string | undefined) {
    forkJoin([
      this.getRoomsOfUser(userId),
      this.getUsersContacts(userId)
      ]
    ).subscribe((r)=>{
      console.log("r",r)
    });
  }
}

