import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompComponent } from './view-comp/view-comp.component';
import { ViewComppComponent } from './view-compp/view-compp.component';
import {MessagesService} from "../../services/messages.service";
import { LucideAngularModule } from 'lucide-angular';



@NgModule({
  declarations: [
    ViewCompComponent,
    ViewComppComponent
  ],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ })
  ],
  providers:[
    MessagesService
  ],
  exports:[
    ViewCompComponent,
    ViewComppComponent
  ]
})
export class TestModuleModule { }
