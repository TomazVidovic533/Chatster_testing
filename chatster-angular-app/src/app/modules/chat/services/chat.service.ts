import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {Message} from "../../../core/models/message.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

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

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {
    super("room_messages", firestore);

  }

  sendMessageToRoom(message: Message, roomId: string) {
    this.addSubCollectionDocument(roomId, 'messages', message);
  }

  getChatRoomMessages(roomId: string): Observable<Message[]>{
    return this.listSubCollection(roomId,'messages');
  }

}

