import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../../core/services/firestore.service";
import {Room} from "../../../core/models/room.model";

@Injectable({ providedIn: 'root' })
export class RoomService extends FirestoreService<Room> {
  constructor(firestore: AngularFirestore) {
    super("rooms", firestore);
  }

}
