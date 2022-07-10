import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsListviewComponent } from './rooms-listview.component';

describe('RoomsListviewComponent', () => {
  let component: RoomsListviewComponent;
  let fixture: ComponentFixture<RoomsListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsListviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
