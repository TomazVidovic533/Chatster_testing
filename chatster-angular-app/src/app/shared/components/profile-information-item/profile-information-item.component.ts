import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-information-item',
  templateUrl: './profile-information-item.component.html',
  styleUrls: ['./profile-information-item.component.css']
})
export class ProfileInformationItemComponent implements OnInit {

  @Input() label!:string;
  @Input() content!:string | undefined | Date;

  constructor() { }

  ngOnInit(): void {
  }

}
