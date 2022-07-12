import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Boxes, Home, MessageCircle, Users, Menu} from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  status:boolean=true;

  home=Home;
  chat=MessageCircle;
  people=Users;
  community=Boxes;
  menu=Menu;

  constructor(private elRef: ElementRef,private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.status = !this.status;
  }

}
