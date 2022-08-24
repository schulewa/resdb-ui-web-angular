import { TestBed } from '@angular/core/testing';

import { ArtefactTypeService } from './artefact-type.service';

describe('ArtefactTypeService', () => {
  let service: ArtefactTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtefactTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
