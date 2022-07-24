import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Room} from "../../../../core/models/room.model";
import {RoomService} from "../../services/room.service";

@Component({
  selector: 'app-edit-room-form',
  templateUrl: './edit-room-form.component.html',
  styleUrls: ['./edit-room-form.component.css']
})
export class EditRoomFormComponent implements OnInit {

  editRoomForm!: FormGroup;
  isPrivateOptions: string[] = ['Private room', 'Public room'];
  // @ts-ignore
  @Input() roomData: Room;

  errors!: string;

  constructor(private formBuilder: FormBuilder,
              private roomService: RoomService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.editRoomForm = this.formBuilder.group({
      name: new FormControl(this.roomData.name, [Validators.required]),
      is_private: new FormControl((this.roomData?.is_private || false) ? 'Private room' : 'Public room', [Validators.required]),
      bio: new FormControl(this.roomData.bio, [Validators.required])
    });
  }

  editRoom(event: Event) {
    let editedData = {
      name: this.editRoomForm.get('name')?.value,
      is_private:
        (this.editRoomForm.get('is_private')?.value != 'Public room'),
      bio: this.editRoomForm.get('bio')?.value
    } as Room;

    if (this.roomData.id != null) {
      this.roomService.update(editedData, this.roomData.id);
      this.router.navigate(['/app/rooms/' + this.roomData.id]);
    }

  }
}

