import {Component, Input, OnInit} from '@angular/core';
import {Video} from "lucide-angular";
import {Observable} from "rxjs";
import {Room} from "../../../../../core/models/room.model";

@Component({
  selector: 'app-call-panel',
  templateUrl: './call-panel.component.html',
  styleUrls: ['./call-panel.component.css']
})
export class CallPanelComponent implements OnInit {

  videocall=Video;

  @Input() roomData$!: Observable<Room>

  constructor() { }

  ngOnInit(): void {
  }

}
