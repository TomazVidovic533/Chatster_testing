import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersListviewComponent } from './members-listview.component';

describe('MembersListviewComponent', () => {
  let component: MembersListviewComponent;
  let fixture: ComponentFixture<MembersListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersListviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
