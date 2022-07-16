import {DataObjectItem} from "../../shared/models/data-object-item";

export interface User extends DataObjectItem{
  id?: string;
  username?: string;
  full_name?: string;
  email: string;
  created_at?: Date,
  gender?: string;
  language?:string;
  is_verified?: boolean;
  password?:string;
  avatar?: string;
}

export interface LoggedUser{
  id?: string;
  name?: string | null;
  email?: string | null;
  photoUrl?: string | null;
}


interface User2 {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
