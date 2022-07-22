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
import {RoomsFilesService} from "../../modules/rooms/services/rooms-files.service";
import {Timestamp} from "@angular/fire/firestore";
import {user} from "@angular/fire/auth";
import {Message} from "../../core/models/message.model";
import {ChatService} from "../../modules/chat/services/chat.service";


@Injectable({providedIn: 'root'})
export class FilesService extends FirestoreService<UploadFile> {
  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private usersService: UsersService,
              private roomsService: RoomService,
              private roomsFilesService: RoomsFilesService,
              private chatService: ChatService) {
    super("files", firestore);
  }

  downloadURL!: Observable<string>;

  getDownloadURL(): Observable<string> {
    return this.downloadURL;
  }

  uploadProfilePhoto(file: File, objectData: User, userId: string | undefined) {
    const filePath = 'files/' + new Date().getTime() + '_' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          if (userId != null) {
            objectData.avatar = downloadURL;
            this.usersService.update(objectData, userId);
          }
          this.add({
            name: file.name,
            path: filePath,
            ownerId: userId,
            created_at: Timestamp.now(),
            url: downloadURL,
          } as UploadFile);

        });
      })
    ).subscribe();
  }

  uploadRoomProfilePhoto(roomData: Room, file: File) {
    const filePath = 'files/' + new Date().getTime() + '_' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          roomData.avatar = downloadURL;
          this.roomsService.add(roomData);

          this.add({
            name: file.name,
            path: filePath,
            ownerId: roomData.owner,
            created_at: Timestamp.now(),
            url: downloadURL,
          } as UploadFile);

        });
      })
    ).subscribe();
  }

  sendFileAsMessage(file: File, roomId: string, userId: string) {
    const filePath = 'files/' + new Date().getTime() + '_' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.add({
            name: file.name,
            path: filePath,
            ownerId: userId,
            created_at: Timestamp.now(),
            url: downloadURL,
          } as UploadFile)
            .then((file) => {
              if (file.id) {
                // @ts-ignore
                this.roomsFilesService.setSubCollectionDocument(roomId, 'files', file.id, {name: file.name} as UploadFile);

                this.chatService.addSubCollectionDocument(roomId, 'messages', {
                  sent_by: userId,
                  created_at: Timestamp.now(),
                  message: ' File sent ' + file.name,
                  fileId: file.id
                } as Message)
              }
            });
        });
      })
    ).subscribe();
  }

  downloadFile() {

  }
}

