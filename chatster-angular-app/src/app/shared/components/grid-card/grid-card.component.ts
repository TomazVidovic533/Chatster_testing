import {Component, Input, OnInit} from '@angular/core';
import {DataObjectItem} from "../../models/data-object-item";
import {Observable} from "rxjs";

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent<T extends DataObjectItem>  implements OnInit {

  @Input()
  dataObject!: T;

  constructor() { }

  ngOnInit(): void {
    console.log('dataobject',this.dataObject)
  }

}
