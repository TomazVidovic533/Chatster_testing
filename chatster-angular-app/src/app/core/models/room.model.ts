export interface Room {
  id?: string;
  name?: string;
  bio?: string;
  is_private?: boolean;
  created_at?: number;
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
  created_at?: number;
  is_group?: boolean;
  recent_message?: string;
  owner?: string;
  avatar?:string;
  roomData: Room;
}
