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

  getSubcollectionData(): Observable<Message[]>{
    return this.listSubcollection('3Lkh1yH7BWYZZhkGtd', 'messages');
  }


}
