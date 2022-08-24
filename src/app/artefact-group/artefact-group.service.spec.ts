import { TestBed } from '@angular/core/testing';

import { ArtefactGroupService } from './artefact-group.service';

describe('ArtefactGroupService', () => {
  let service: ArtefactGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtefactGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
