import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";

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


  constructor() { }

  ngOnInit(): void {

  }

  triggerButton(event: Event) {
    this.clickTrigger.emit(event);
  }

}
