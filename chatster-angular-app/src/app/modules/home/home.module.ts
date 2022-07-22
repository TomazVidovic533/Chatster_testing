import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {OverviewComponent} from "./views/overview/overview.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    OverviewComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
