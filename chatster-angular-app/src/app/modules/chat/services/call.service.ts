import { Injectable } from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Call} from "../../../core/models/call.model";

@Injectable({
  providedIn: 'root'
})
export class CallService extends FirestoreService<Call> {

  constructor(private firestore: AngularFirestore) {
    super("calls", firestore);

  }

  createNewCallRoom(id: string, otherid: string) {

  }

  initLocalStreams(){

  }

  startCall(){

  }

  joinCall(){

  }


}
