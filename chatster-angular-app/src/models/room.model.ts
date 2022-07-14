//ng generate interface Employee --type=model
import {Message} from "./message.model";
import {DataObjectItem} from "../app/shared/models/data-object-item";

export interface Room extends DataObjectItem {
  avatar: string;
  bio: string;
  created_at: number;
  is_community: boolean;
  is_private: boolean;
  max_members: number;
  name: string;
  [members: string]: any;
  recent_message?: Message;
}
