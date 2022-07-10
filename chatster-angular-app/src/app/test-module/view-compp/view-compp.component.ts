import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Boxes, Home, MessageCircle, Users} from 'lucide-angular';
@Component({
  selector: 'app-view-compp',
  templateUrl: './view-compp.component.html',
  styleUrls: ['./view-compp.component.css']
})
export class ViewComppComponent implements OnInit {

  status:boolean=true;
  home=Home;
  chat=MessageCircle;
  people=Users;
  community=Boxes;

  constructor(private elRef: ElementRef,private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.status = !this.status;
  }

}
