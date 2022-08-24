import { TestBed } from '@angular/core/testing';

import { MeasureTypeService } from './measure-type.service';

describe('MeasureTypeService', () => {
  let service: MeasureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasureTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
