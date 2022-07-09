import {File} from "./file.model";

export interface Message {
  id?: string;
  created_at: number;
  sent_by: string;
  message: string;
  files?: File[];
}
