import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BaseService} from "./base.service";
import {Room} from "../models/room.model";

@Injectable({ providedIn: 'root' })
export class TestroomService extends BaseService<Room> {
  constructor(afs: AngularFirestore) {
    super("rooms", afs);
  }



}
