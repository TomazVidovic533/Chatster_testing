import {Injectable} from '@angular/core';
import {FirestoreService} from "../../core/services/firestore.service";
import {UploadFile} from "../../core/models/file.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {UsersService} from "../../modules/people/services/users.service";
import {RoomService} from "../../modules/rooms/services/room.service";
import {DataObjectItem} from "../models/data-object-item";
import {Observable, Subject, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends FirestoreService<DataObjectItem> {
  searchResults$!: Observable<DataObjectItem[]>;

  constructor(private firestore: AngularFirestore) {
    super("users", firestore);
  }

  queryString(fieldName: string, queryString: string) {

  }

  getSearchResults() {
    return this.searchResults$;
  }
}

