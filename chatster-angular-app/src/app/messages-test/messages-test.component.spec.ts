import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesTestComponent } from './messages-test.component';

describe('MessagesTestComponent', () => {
  let component: MessagesTestComponent;
  let fixture: ComponentFixture<MessagesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
