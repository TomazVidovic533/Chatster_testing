
//ng generate interface Employee --type=model
export interface Room {
  avatar:         string;
  bio:            string;
  created_at:     number;
  is_community:   boolean;
  is_private:     boolean;
  max_members:    number;
  members:        object;
  name:           string;
  recent_message: object;
}
