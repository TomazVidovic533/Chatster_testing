import { Injectable } from '@angular/core';
import {Room} from "../../../../models/room.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirestoreService} from "../../../core/services/firestore.service";

@Injectable({ providedIn: 'root' })
export class RoomService extends FirestoreService<Room> {
  constructor(firestore: AngularFirestore) {
    super("rooms", firestore);
  }

}
