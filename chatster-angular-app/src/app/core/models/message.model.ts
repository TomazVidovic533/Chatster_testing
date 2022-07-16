import {UploadFile} from "./file.model";

export interface Message {
  id?:string;
  created_at?: Date;
  sent_by?: string;
  message?: string;
  file?: UploadFile
}
