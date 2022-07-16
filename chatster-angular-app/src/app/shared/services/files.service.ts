import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, last, map, Observable, tap} from "rxjs";
import {FirestoreService} from "../../core/services/firestore.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UploadFile} from "../../core/models/file.model";
import {User} from "../../core/models/user.model";
import {UsersService} from "../../modules/people/services/users.service";
import {RoomService} from "../../modules/rooms/services/room.service";
import {Room} from "../../core/models/room.model";


@Injectable({providedIn: 'root'})
export class FilesService extends FirestoreService<UploadFile> {
  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private usersService: UsersService,
              private roomsService: RoomService) {
    super("files", firestore);
  }

  downloadURL!: Observable<string>;

  getDownloadURL(): Observable<string> {
    return this.downloadURL;
  }

  uploadProfilePhoto(file: File, objectData: User, userId: string | undefined) {
    if (!userId) {
      return;
    }
    const filePath = 'files/' + new Date().getTime() + '_' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          objectData.avatar = downloadURL;
          this.add({
            name: file.name,
            path: filePath,
            ownerId: userId,
            created_at: new Date().getTime(),
            url: downloadURL,
          } as UploadFile);
          this.usersService.update(objectData, userId);
        });
      })
    ).subscribe();
  }

  uploadRoomProfilePhoto(){

  }

  sendFileAsMessage(){

  }

  downloadFile() {

  }
}

