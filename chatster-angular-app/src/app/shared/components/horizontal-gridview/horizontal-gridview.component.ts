import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DataObjectItem} from "../../models/data-object-item";

@Component({
  selector: 'app-horizontal-gridview',
  templateUrl: './horizontal-gridview.component.html',
  styleUrls: ['./horizontal-gridview.component.css']
})
export class HorizontalGridviewComponent<T extends DataObjectItem> implements OnInit {

  @Input() dataSource!: Observable<T[]>;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.subscribe();
  }

}
