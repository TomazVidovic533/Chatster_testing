import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppViewComponent } from './views/app-view/app-view.component';
import {LucideAngularModule} from "lucide-angular";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";

@NgModule({
  declarations: [
    AppViewComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LucideAngularModule
  ]
})
export class AppModule { }
