import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {GridviewComponent} from "./components/gridview/gridview.component";
import {SearchSectionComponent} from "./components/search-section/search-section.component";
import {GridCardComponent} from "./components/grid-card/grid-card.component";
import {RouterModule} from "@angular/router";
import {ProfileHeaderComponent} from "./components/profile-header/profile-header.component";
import {
  ProfileInformationItemComponent
} from "./components/profile-information-item/profile-information-item.component";
import {
  ProfileInformationSectionComponent
} from "./components/profile-information-section/profile-information-section.component";
import { CustomFormInputTextComponent } from './components/custom-form-input-text/custom-form-input-text.component';
import {FormsModule} from "@angular/forms";
import { CustomFileUploadComponent } from './components/custom-file-upload/custom-file-upload.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

@NgModule({
  declarations: [
    GridviewComponent,
    SearchSectionComponent,
    GridCardComponent,
    ProfileHeaderComponent,
    ProfileInformationItemComponent,
    ProfileInformationSectionComponent,
    CustomFormInputTextComponent,
    CustomFileUploadComponent,
    CustomButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule.pick({}),
    FormsModule
  ],
  exports: [
    GridviewComponent,
    SearchSectionComponent,
    GridCardComponent,
    ProfileInformationItemComponent,
    ProfileHeaderComponent,
    ProfileInformationSectionComponent,
    CustomFormInputTextComponent,
    CustomFileUploadComponent,
    CustomButtonComponent
  ]
})
export class SharedModule { }
