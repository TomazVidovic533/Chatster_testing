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
import {TestComponent} from './test/test.component';
import {AngularFireModule} from "@angular/fire/compat";

import * as fromServices from "../services/base-service.service";
import {MessagesTestComponent} from './messages-test/messages-test.component';
import {TestModuleModule} from "./test-module/test-module.module";
import {NotFoundComponent} from './core/components/not-found/not-found.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MessagesTestComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    TestModuleModule,
    FormsModule
  ],
  providers: [fromServices.BaseServiceService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
