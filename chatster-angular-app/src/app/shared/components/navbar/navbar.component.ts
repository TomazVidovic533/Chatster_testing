import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Boxes, Home, MessageCircle, Users, Menu, LogOut} from 'lucide-angular';
import {AuthService} from "../../../modules/auth/services/auth.service";

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
  logout=LogOut;

  userId!: string;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userId=this.authService.user$.uid;
    console.log("moj id",this.authService.user$.uid )
    console.log("moj user", this.authService.user$)
  }

  toggleMenu(){
    this.status = !this.status;
  }

  logOut(){
    this.authService.logOut();
  }

}
