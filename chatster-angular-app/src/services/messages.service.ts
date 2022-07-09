import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BaseService} from "./base.service";
import {Message} from "../models/message.model";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class MessagesService extends BaseService<Message> {
  constructor(afs: AngularFirestore) {
    super("room_messages", afs);
  }


  test(uid:string,rid:string,m:string){
    this.afs.collection('room_messages').doc(rid).collection('messages').add({
      uid:uid,
      message: m
    });
  }

  getMessages(): Observable<Message[]>{
    return this.listSubCollection('TDdWM7XZ9j0gbX9HsoCE', 'messages');
  }

  addMessage(message: Message):Promise<Message>{
    return this.addSubCollectionDocument('TDdWM7XZ9j0gbX9HsoCE','messages',message);
  }

  editMessage(message: Message): Promise<Message>{
    return this.updateSubCollectionDocument('TDdWM7XZ9j0gbX9HsoCE', 'messages','4ZCCeh94Jzb6xo4fzTcq', message);
  }

  deleteMessage(){
    this.deleteSubCollectionDocument('TDdWM7XZ9j0gbX9HsoCE', 'messages','4ZCCeh94Jzb6xo4fzTcq');
  }

}
