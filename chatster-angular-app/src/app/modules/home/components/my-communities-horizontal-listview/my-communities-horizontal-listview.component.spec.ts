import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommunitiesHorizontalListviewComponent } from './my-communities-horizontal-listview.component';

describe('MyCommunitiesHorizontalListviewComponent', () => {
  let component: MyCommunitiesHorizontalListviewComponent;
  let fixture: ComponentFixture<MyCommunitiesHorizontalListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCommunitiesHorizontalListviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCommunitiesHorizontalListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
