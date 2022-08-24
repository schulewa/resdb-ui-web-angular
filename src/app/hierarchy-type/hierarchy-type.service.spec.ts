import { TestBed } from '@angular/core/testing';

import { HierarchyTypeService } from './hierarchy-type.service';

describe('HierarchyTypeService', () => {
  let service: HierarchyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HierarchyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
