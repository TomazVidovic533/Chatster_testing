import { TestBed } from '@angular/core/testing';

import { TestroomService } from './testroom.service';

describe('TestroomService', () => {
  let service: TestroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
