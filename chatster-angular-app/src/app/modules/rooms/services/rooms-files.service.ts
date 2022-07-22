import { Injectable } from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {UploadFile} from "../../../core/models/file.model";

@Injectable({
  providedIn: 'root'
})
export class RoomsFilesService extends FirestoreService<UploadFile>{

  constructor(private firestore: AngularFirestore, private router: Router) {
    super("rooms_files", firestore);
  }
}
