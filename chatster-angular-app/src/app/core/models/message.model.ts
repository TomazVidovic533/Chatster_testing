import {UploadFile} from "./file.model";
import {User} from "./user.model";
import { Timestamp } from '@angular/fire/firestore';

export interface Message {
  id?:string;
  created_at?: Timestamp;
  sent_by?: string;
  message?: string;
  file?: UploadFile
  userData?: User;
}

export interface MappedMessage {
  messageData: Message,
  userData: any
}
