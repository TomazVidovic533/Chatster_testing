import {Component, Input, OnInit} from '@angular/core';
import {DataObjectItem} from "../../models/data-object-item";
import {Observable} from "rxjs";

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent<T extends DataObjectItem> implements OnInit {

  @Input() dataSource!: Observable<T[]>;

  constructor() { }

  ngOnInit(): void {

  }

}
