import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Boxes, Home, MessageCircle, Users, Menu, LogOut} from 'lucide-angular';
import {AuthService} from "../../../modules/auth/services/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user.model";

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

  // @ts-ignore
  userId!: Observable<firebase.User>;

  userData$!: Observable<User|null>;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userId=this.authService.user$;
    this.userId.subscribe();

    this.userData$=this.authService.getUserData();
    this.userData$.subscribe((res)=>{
      console.log("nav", res)
    });
  }

  toggleMenu(){
    this.status = !this.status;
  }

  logOut(){
    this.authService.logOut();
  }

}
