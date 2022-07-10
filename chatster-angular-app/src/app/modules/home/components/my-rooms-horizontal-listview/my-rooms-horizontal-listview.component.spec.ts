import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoomsHorizontalListviewComponent } from './my-rooms-horizontal-listview.component';

describe('MyRoomsHorizontalListviewComponent', () => {
  let component: MyRoomsHorizontalListviewComponent;
  let fixture: ComponentFixture<MyRoomsHorizontalListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRoomsHorizontalListviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRoomsHorizontalListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
