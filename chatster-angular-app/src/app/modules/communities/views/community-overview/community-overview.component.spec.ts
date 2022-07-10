import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityOverviewComponent } from './community-overview.component';

describe('CommunityOverviewComponent', () => {
  let component: CommunityOverviewComponent;
  let fixture: ComponentFixture<CommunityOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
