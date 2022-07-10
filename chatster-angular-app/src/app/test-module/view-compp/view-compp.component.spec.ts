import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComppComponent } from './view-compp.component';

describe('ViewComppComponent', () => {
  let component: ViewComppComponent;
  let fixture: ComponentFixture<ViewComppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewComppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
