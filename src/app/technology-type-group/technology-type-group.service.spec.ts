import { TestBed } from '@angular/core/testing';

import { TechnologyTypeGroupService } from './technology-type-group.service';

describe('TechnologyTypeGroupService', () => {
  let service: TechnologyTypeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologyTypeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
