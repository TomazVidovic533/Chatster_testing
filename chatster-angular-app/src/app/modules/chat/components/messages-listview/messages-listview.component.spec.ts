import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesListviewComponent } from './messages-listview.component';

describe('MessagesListviewComponent', () => {
  let component: MessagesListviewComponent;
  let fixture: ComponentFixture<MessagesListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesListviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
