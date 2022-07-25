import {Injectable} from '@angular/core';
import {FirestoreService} from "../../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {LoggedUser, User} from "../../../core/models/user.model";
import {user} from "@angular/fire/auth";
import {combineLatest, map, Observable, of, switchMap} from "rxjs";
import {Room} from "../../../core/models/room.model";

@Injectable({providedIn: 'root'})
export class UsersService extends FirestoreService<User> {
  constructor(private firestore: AngularFirestore) {
    super("users", firestore);
  }

  getRoomsOfUser(userId: string | undefined): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('rooms', ref => ref.where('is_group', '==', true))
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

  getUsersContacts(userId: string | undefined): Observable<any> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('contacts')
      .snapshotChanges()
      .pipe(
        map((actions: any[]) => actions.map((a) => ({...a.payload.doc.data(), ...{id: a.payload.doc.id}}))),
        switchMap((products: any[]) => {
          const pricesCols$ = products.map((p) =>
            this.firestore
              .collection(`users`).doc(p.id)
              .valueChanges()
          );
          return combineLatest([of(products), combineLatest(pricesCols$.length ? pricesCols$ : [of([])])]);
        }),
        map(([products, pricesCols]) =>
          products.map((p, idx) => {
            p.userData = pricesCols[idx];
            return p;
          })
        )
      );
  }

}
