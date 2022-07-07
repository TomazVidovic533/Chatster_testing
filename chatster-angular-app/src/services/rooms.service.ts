import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private firestore: AngularFirestore) {


  }


  public addRoom(name: string, avatar: string, bio: string, usersIds: string[]) {
    let members: { [key: string]: boolean } = {};
    for (const userId of usersIds) {
      members[userId] = true;
    }
    this.firestore.collection("rooms").add({
      name: name,
      bio: bio,
      avatar: avatar,
      created_at: new Date().getTime(),
      is_private: true,
      is_community: false,
      max_members: 2,
      members: members,
      recent_message: {
        created_at: null,
        sent_by: null,
        message: null
      }
    }).then((e) => {
      console.log(e)
    })
  }


}
