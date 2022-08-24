import { TestBed } from '@angular/core/testing';

import { LanguageGroupService } from './language-group.service';

describe('LanguageGroupService', () => {
  let service: LanguageGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
