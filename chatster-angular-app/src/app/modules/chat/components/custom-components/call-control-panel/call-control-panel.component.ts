import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-call-control-panel',
  templateUrl: './call-control-panel.component.html',
  styleUrls: ['./call-control-panel.component.css']
})
export class CallControlPanelComponent implements OnInit {

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {

  }

}
