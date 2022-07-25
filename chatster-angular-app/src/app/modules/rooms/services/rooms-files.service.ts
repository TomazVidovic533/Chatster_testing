import { Injectable } from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {UploadFile} from "../../../core/models/file.model";
import {combineLatest, map, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomsFilesService extends FirestoreService<UploadFile>{

  constructor(private firestore: AngularFirestore, private router: Router) {
    super("rooms_files", firestore);
  }

  getSharedFilesInRoom(roomId: string){
    return this.firestore
      .collection('rooms_files')
      .doc(roomId)
      .collection('files')
      .snapshotChanges()
      .pipe(
        map((actions: any[]) => actions.map((a) => ({...a.payload.doc.data(), ...{id: a.payload.doc.id}}))),
        switchMap((products: any[]) => {
          const pricesCols$ = products.map((p) =>
            this.firestore
              .collection(`files`).doc(p.id)
              .valueChanges()
          );
          return combineLatest([of(products), combineLatest(pricesCols$.length ? pricesCols$ : [of([])])]);
        }),
        map(([products, pricesCols]) =>
          products.map((p, idx) => {
            p.fileData = pricesCols[idx];
            return p;
          })
        )
      );
  }
}
