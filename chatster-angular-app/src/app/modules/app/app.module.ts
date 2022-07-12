import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { AppViewComponent } from './views/app-view/app-view.component';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {LucideAngularModule} from "lucide-angular";

@NgModule({
  declarations: [
    AppViewComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LucideAngularModule
  ]
})
export class AppModule { }
