import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListviewComponent } from './users-listview.component';

describe('UsersListviewComponent', () => {
  let component: UsersListviewComponent;
  let fixture: ComponentFixture<UsersListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
