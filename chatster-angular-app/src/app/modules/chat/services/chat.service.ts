import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {Message} from "../../../core/models/message.model";
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable, of,
  Subscription,
  switchMap,
  toArray
} from "rxjs";
import {RoomService} from "../../rooms/services/room.service";
import {User} from "../../../core/models/user.model";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends FirestoreService<Message> {
  get roomId$(): BehaviorSubject<string> {
    return this._roomId$;
  }

  set roomId$(value: BehaviorSubject<string>) {
    this._roomId$ = value;
  }

  private _roomId$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private firestore: AngularFirestore,
              private route: ActivatedRoute,
              private roomsService: RoomService) {
    super("room_messages", firestore);

  }

  sendMessageToRoom(message: Message, roomId: string) {
    this.addSubCollectionDocument(roomId, 'messages', message);
  }

  getChatRoomMessages(roomId: string): Observable<Message[]> {
    return this.listSubCollection(roomId, 'messages');
  }

  getIds(roomId: string): Observable<any> {
    return this.firestore.collection('rooms').doc(roomId).collection('members')
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
      .collection('rooms')
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
            this.firestore
              .collection(`users`)
              .doc(message.sent_by)
              .valueChanges()
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

  /* return combineLatest([
     this.getIds(roomId),
     this.getMessages(roomId)
   ]).pipe(
     map(([members,messages]) => {
       return messages;
     })
   )*/
}

