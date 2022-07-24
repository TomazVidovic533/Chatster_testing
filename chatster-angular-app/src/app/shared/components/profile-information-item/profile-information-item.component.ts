import {Component, Input, OnInit} from '@angular/core';
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-profile-information-item',
  templateUrl: './profile-information-item.component.html',
  styleUrls: ['./profile-information-item.component.css']
})
export class ProfileInformationItemComponent implements OnInit {

  @Input() label!:string;
  @Input() content!:string | undefined;
  @Input() date!: Timestamp | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
