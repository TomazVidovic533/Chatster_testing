import {Message} from "./message.model";

export interface Room {
  id?: string;
  name?: string;
  bio?: string;
  is_private?: boolean;
  created_at?: number;
  is_group?: boolean;
  recent_message?: Message;
  owner?: string;
  avatar?:string;
}
