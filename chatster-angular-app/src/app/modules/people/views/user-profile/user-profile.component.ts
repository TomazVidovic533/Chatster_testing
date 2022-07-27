import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {first, map, Observable, switchMap, take} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../../../core/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../rooms/services/room.service";
import {Room} from "../../../../core/models/room.model";
import {Timestamp} from "@angular/fire/firestore";
import {TranslateService} from "@ngx-translate/core";
import {DataObjectItem} from "../../../../shared/models/data-object-item";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private roomsService: RoomService,
              private authService: AuthService,
              private translateService: TranslateService,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  userData$!: Observable<User>;
  userObj!: User;
  id!: string | null;
  myId!: string | undefined;

  createdAtLabel!: string;
  nameLabel!: string;
  usernameLabel!: string;
  emailLabel!: string;
  genderLabel!: string;
  languageLabel!: string;
  bioLabel!: string;
  proStatusLabel!: string;

  errors!: string;
  usersRooms$!: Observable<DataObjectItem[]>;

  isViewingUserContact: boolean = true;

  ngOnInit(): void {

    this.authService.getUserData().pipe().subscribe((user) => {
      if (user?.language == 'Slovene') {
        this.translateService.use('si');
      } else if (user?.language == 'English') {
        this.translateService.use('en');
      }
    })

    this.translateService.onLangChange.subscribe((language)=>{
      this.translateService.use(language.lang);
      this._changeDetectorRef.detectChanges();
    })


    this.authService.getUserData().pipe(take(1)).subscribe((userData) => {
      // @ts-ignore
      this.myId = userData.id;
    })

    this.translateService.get([
      'profile.created_at',
      'profile.bio',
      'profile.name',
      'profile.username',
      'profile.email',
      'profile.gender',
      'profile.language',
      'profile.pro'])
      .subscribe(translations => {
        this.createdAtLabel = translations['profile.created_at'];
        this.bioLabel = translations['profile.bio'];
        this.nameLabel = translations['profile.name'];
        this.usernameLabel = translations['profile.username'];
        this.emailLabel = translations['profile.email'];
        this.genderLabel = translations['profile.gender'];
        this.languageLabel = translations['profile.language'];
        this.proStatusLabel = translations['profile.pro'];
      });


    this.id = this.route.snapshot.paramMap.get('userId');

    if (this.id) {
      this.userData$ = this.userService.get(this.id);
      this.userData$.subscribe((user) => {
        this.userObj = user;
      });
    }

    // @ts-ignore
    this.usersRooms$ = this.userService.getRoomsOfUser(this.id).pipe(
      map(data => {
        return data.map((element: any) => {
          return {
            id: element.id,
            avatar: element.roomData.avatar,
            name: element.roomData.name,
          };
        });
      }));

    this.usersRooms$.subscribe((members)=>{
      console.log("rooms of user",members)
      for(let i = 0; i < members.length; i++) {
        if (members[i].id == this.myId) {
          this.isViewingUserContact = true;
          break;
        }
      }
    })

  }

  startConversation(event: Event) {
    this.authService.getUserData().pipe(take(1)).subscribe((myUserData) => {
      if (myUserData) {
        this.roomsService.startConversation({
          name: this.userObj.name + ' - ' + myUserData.name,
          is_private: true,
          is_group: false,
          recent_message: '',
          created_at: Timestamp.now(),
          avatar: this.userObj.avatar
        } as unknown as Room, this.userObj, myUserData);
      }
    })
  }

  edit(event: Event) {

  }

  delete(event: Event) {
    if (this.myId != null) {
      localStorage.removeItem('myUserId')
      this.authService.deleteAccount();
      this.authService.logOut();
    }
  }

}
