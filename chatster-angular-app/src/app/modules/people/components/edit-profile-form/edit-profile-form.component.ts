import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {take} from "rxjs";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {

  editUserForm!: FormGroup;
  languageOptions: string[] = ['Slovene', 'English', 'Spanish'];
  genderOptions: string[] = ['Male', 'Female'];
  @Input() userData!: User;

  constructor(private formBuilder:FormBuilder,
              private router: Router,
              private authService: AuthService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      name: new FormControl(this.userData.name, [Validators.required]),
      username: new FormControl(this.userData.username, [Validators.required]),
      gender: new FormControl(this.userData.gender, [Validators.required]),
      language: new FormControl(this.userData.language, [Validators.required]),
      bio: new FormControl(this.userData.bio, [Validators.required]),
    });
  }

  editUser(event: Event){
    let editedData = {
      name: this.editUserForm.get('name')?.value,
      username: this.editUserForm.get('username')?.value,
      gender: this.editUserForm.get('gender')?.value,
      language: this.editUserForm.get('language')?.value,
      bio: this.editUserForm.get('bio')?.value
    } as User;

    this.authService.getUserData().pipe(take(1)).subscribe((user)=>{
      this.usersService.update(editedData, <string>user?.id);
      this.router.navigate(['/app/profile/' + <string>user?.id]);
    })
  }

}
