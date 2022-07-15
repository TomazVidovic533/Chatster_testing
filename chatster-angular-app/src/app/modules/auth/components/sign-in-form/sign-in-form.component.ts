import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  signInForm!: FormGroup;
  optionItems:string[] = ['Male', 'Female', 'Other'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [],
      password: [],
      gender: ['Male']
    });
  }

  signInGoogle(){

  }

  signInWithEmailAndPassword(){

  }

}
