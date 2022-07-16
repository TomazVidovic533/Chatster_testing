import {Injectable} from '@angular/core';
import {BehaviorSubject, first, Observable, of, switchMap} from "rxjs";
import {LoggedUser, User} from "../../../core/models/user.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UsersService} from "../../people/services/users.service";
import {Router} from "@angular/router";
import {GoogleAuthProvider} from 'firebase/auth';
import {FilesService} from "../../../shared/services/files.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  user$!: firebase.User;


  constructor(private usersService: UsersService,
              private fireAuth: AngularFireAuth,
              private router: Router,
              private filesService: FilesService) {

    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user$ = user;
      }
    });
  };

  isLoggedIn() {
    return this.fireAuth.authState.pipe(first())
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      return res;
    })
      .catch(err => {
        return err.message;
      });
  }

  signUpWithEmailAndPassword(userData: User, password: string, file: File) {
    return this.fireAuth
      .createUserWithEmailAndPassword(<string>userData.email, password).then((userCredential) => {
        this.filesService.uploadProfilePhoto(file, userData, userCredential.user?.uid);
        this.signInWithEmailAndPassword(userData.email, password).then(r => {
          this.resendVerificationEmail();
        });
      })
      .catch((error) => {
      });
  }

  resendVerificationEmail() {
    this.fireAuth.currentUser.then((user) => {
      user?.sendEmailVerification().then(() => {
        this.router.navigate(['auth/resend-verification']);
      });
    })
  }

  forgotPassword(email: string) {
    this.fireAuth.currentUser.then((user) => {
      return this.fireAuth.sendPasswordResetEmail(<string>user?.email).then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
        .catch((error) => {
          window.alert(error);
        });
    })
  }


  async signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then((res) => {
      console.log(res.user)
      if (res.user?.emailVerified == false) {
        this.resendVerificationEmail();
      } else {
        this.router.navigate(['app/home']);
      }
    })
      .catch((error) => {
      });
  }

  logOut() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['auth/sign-in'])
    });
  }

}
