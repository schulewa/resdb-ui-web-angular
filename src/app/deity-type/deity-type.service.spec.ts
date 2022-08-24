import { TestBed } from '@angular/core/testing';

import { DeityTypeService } from './deity-type.service';

describe('DeityTypeService', () => {
  let service: DeityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeityTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
