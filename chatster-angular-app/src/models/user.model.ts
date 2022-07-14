import {DataObjectItem} from "../app/shared/models/data-object-item";

export interface User extends DataObjectItem {
  name:string;
  language:string;
  gender:string;
}
