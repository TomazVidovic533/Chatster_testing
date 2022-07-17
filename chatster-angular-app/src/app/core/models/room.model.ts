interface Members {
  id?: string;
}

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
  members?: Members[];
}
