import {Timestamp} from "@angular/fire/firestore";

export interface Room {
  id?: string;
  name?: string;
  bio?: string;
  is_private?: boolean;
  created_at?: Timestamp;
  is_group?: boolean;
  recent_message?: string;
  owner?: string;
  avatar?:string;
}

export interface MappedRoom {
  id?: string;
  name?: string;
  bio?: string;
  is_private?: boolean;
  created_at?: Timestamp;
  is_group?: boolean;
  recent_message?: string;
  owner?: string;
  avatar?:string;
  roomData: Room;
}
