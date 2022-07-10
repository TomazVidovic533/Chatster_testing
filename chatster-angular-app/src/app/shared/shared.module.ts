import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridviewComponent } from './components/gridview/gridview.component';
import { ListviewComponent } from './components/listview/listview.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    GridviewComponent,
    ListviewComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
