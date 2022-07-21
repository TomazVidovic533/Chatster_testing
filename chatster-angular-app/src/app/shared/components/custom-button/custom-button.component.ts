import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Delete, Edit, MessageCircle, Trash} from "lucide-angular";

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  //@Input() disabled!: Observable<boolean>;
  @Input() name!: string;
  @Input() btnType!: string;
  @Output() clickTrigger = new EventEmitter<any>();

  edit=Edit;
  delete=Trash;
  startConvo=MessageCircle;

  constructor() { }

  ngOnInit(): void {

  }

  triggerButton(event: Event) {
    this.clickTrigger.emit(event);
  }

}
