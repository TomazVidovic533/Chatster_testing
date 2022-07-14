import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {GridviewComponent} from "./components/gridview/gridview.component";
import {SearchSectionComponent} from "./components/search-section/search-section.component";

@NgModule({
  declarations: [
    GridviewComponent,
    SearchSectionComponent
  ],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ })
  ],
  exports: [
    GridviewComponent,
    SearchSectionComponent
  ]
})
export class SharedModule { }
