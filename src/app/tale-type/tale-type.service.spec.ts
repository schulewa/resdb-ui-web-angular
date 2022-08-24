import { TestBed } from '@angular/core/testing';

import { TaleTypeService } from './tale-type.service';

describe('TaleTypeService', () => {
  let service: TaleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaleTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
