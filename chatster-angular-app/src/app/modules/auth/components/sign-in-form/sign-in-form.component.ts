import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, tap} from "rxjs";

export function requiredFileType( type: string ) {
  return function (control: FormControl) {
    const file = control.value;
    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  signInForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  signInGoogle(event: Event){

  }

  signInWithEmailAndPassword(event: Event){

  }

  /*
  * optionItems:string[] = ['Male', 'Female', 'Other'];
    this.signInForm = this.formBuilder.group({
      email: [],
      password: [],
      gender: ['Male'],
      file: new FormControl(null, [Validators.required, requiredFileType('png')])
    });
    this.signInForm.valueChanges.subscribe((res)=>{
      console.log(res)
    })
  *   const path = `test/${Date.now()}_${this.signInForm.value.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.storage.upload(path, this.signInForm.get('file')?.value).snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        let downloadURL = await ref.getDownloadURL();
        console.log(downloadURL)
      }),
    );
  * */

}
