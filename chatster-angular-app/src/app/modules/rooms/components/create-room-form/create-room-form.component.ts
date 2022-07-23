import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomService} from "../../services/room.service";
import {Room} from "../../../../core/models/room.model";
import {AuthService} from "../../../auth/services/auth.service";
import {Observable, take} from "rxjs";
import {User} from "../../../../core/models/user.model";
import {FilesService} from "../../../../shared/services/files.service";
import {Router} from "@angular/router";
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-create-room-form',
  templateUrl: './create-room-form.component.html',
  styleUrls: ['./create-room-form.component.css']
})
export class CreateRoomFormComponent implements OnInit {

  createRoomForm!: FormGroup;
  isPrivateOptions: string[] = ['Private room', 'Public room'];
  userData$!: Observable<User | null>;

  constructor(private formBuilder: FormBuilder,
              private roomService: FilesService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createRoomForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
      is_private: new FormControl('Public room', [Validators.required]),
      bio: new FormControl(null, [Validators.required])
    });

    this.userData$ = this.authService.getUserData();
  }

  createNewRoom(event: Event) {
    this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
      let newRoomData = {
        name: this.createRoomForm.get('name')?.value,
        is_private:
          (this.createRoomForm.get('is_private')?.value != 'Public room'),
        is_group: true,
        recent_message: '',
        owner: user?.id,
        bio: this.createRoomForm.get('bio')?.value,
        created_at: Timestamp.now(),
      } as Room;

      this.roomService.uploadRoomProfilePhoto(newRoomData, this.createRoomForm.get('avatar')?.value);

      this.router.navigate(['/app/rooms']);
    })
  }

}
