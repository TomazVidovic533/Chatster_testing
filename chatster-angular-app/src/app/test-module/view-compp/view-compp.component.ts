import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-view-compp',
  templateUrl: './view-compp.component.html',
  styleUrls: ['./view-compp.component.css']
})
export class ViewComppComponent implements OnInit {

  status:boolean=true;

  constructor(private elRef: ElementRef,private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.status = !this.status;
  }

}
