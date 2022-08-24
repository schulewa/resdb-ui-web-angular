import { TestBed } from '@angular/core/testing';

import { RaceTypeService } from './race-type.service';

describe('RaceTypeService', () => {
  let service: RaceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
