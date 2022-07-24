import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {TableDataItem} from "../../../core/models/table-data-item.model";
import {Eye, Trash2} from "lucide-angular";
import {DataObjectItem} from "../../models/data-object-item";

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent<T extends TableDataItem> implements OnInit {
  @Input() title!: string;
  @Input() contentHeader!: string;
  @Input() nameHeader!: string;
  @Input() viewActionHeader!: string;
  @Input() deleteActionHeader!: string;
  @Input() redirectPath!: string;
  @Input() isOwner!: boolean;
  @Input() dataSource!: Observable<T[]>

  @Output() onDeleteTriggered: EventEmitter<any> = new EventEmitter();
  view=Eye;
  trash=Trash2;

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteClicked(clickedEntry: Event, id: string): void {
    this.onDeleteTriggered.emit([clickedEntry, id]);
  }

  goToUrl(url: string) {
    window.location.href = url;
  }
}
