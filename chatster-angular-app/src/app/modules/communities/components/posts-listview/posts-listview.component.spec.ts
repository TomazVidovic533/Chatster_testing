import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListviewComponent } from './posts-listview.component';

describe('PostsListviewComponent', () => {
  let component: PostsListviewComponent;
  let fixture: ComponentFixture<PostsListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsListviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
