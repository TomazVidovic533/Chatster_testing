import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { TestComponent } from './test/test.component';
import {AngularFireModule} from "@angular/fire/compat";

import * as fromServices from "../services/base-service.service";
import { MessagesTestComponent } from './messages-test/messages-test.component';
import {TestModuleModule} from "./test-module/test-module.module";
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CommunitiesOverviewComponent } from './modules/communites/views/communities-overview/communities-overview.component';
import { CommunitiyProfileComponent } from './modules/communites/views/communitiy-profile/communitiy-profile.component';
import { CommunityProfileComponent } from './modules/communites/views/community-profile/community-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MessagesTestComponent,
    NavbarComponent,
    NotFoundComponent,
    CommunitiesOverviewComponent,
    CommunitiyProfileComponent,
    CommunityProfileComponent
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
    TestModuleModule
  ],
  providers: [fromServices.BaseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
