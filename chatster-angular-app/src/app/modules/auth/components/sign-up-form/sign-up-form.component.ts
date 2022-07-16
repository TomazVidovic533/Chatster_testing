import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/user.model";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  signUpForm!: FormGroup;

  selectedImage: string = 'nekaj';
  genderOptions: string[] = ['Male', 'Female', 'Other'];
  languageOptions: string[] = ['Slovene', 'English', 'Spanish'];

  constructor(private formBuilder: FormBuilder,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      full_name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      gender: new FormControl('Male', [Validators.required]),
      language: new FormControl('Slovene', [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
      bio: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  signUpWithEmailAndPassword(event: Event){
    let user = {
      full_name: this.signUpForm.get('full_name')?.value,
      username: this.signUpForm.get('username')?.value,
      email: this.signUpForm.get('email')?.value,
      gender: this.signUpForm.get('gender')?.value,
      language: this.signUpForm.get('language')?.value,
      bio: this.signUpForm.get('bio')?.value
    }as User;
    this.authService.signUpWithEmailAndPassword(user, this.signUpForm.get('password')?.value,this.signUpForm.get('avatar')?.value).then(r =>{
      console.log(r)
    });
  }

  signInGoogle(event: Event){
    this.authService.signInWithGoogle();
  }
}
