import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideFunctions, getFunctions} from '@angular/fire/functions';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA5LbF0IE57-eEFdkn7SdkVxOBXC7Fh0bA",
      authDomain: "chatster-b1798.firebaseapp.com",
      databaseURL: "https://chatster-b1798-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "chatster-b1798",
      storageBucket: "chatster-b1798.appspot.com",
      messagingSenderId: "962953446865",
      appId: "1:962953446865:web:5c6e53af6ff901e27dccf0",
      measurementId: "G-3Y5GQJNPNE"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
