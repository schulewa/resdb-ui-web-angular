import { TestBed } from '@angular/core/testing';

import { EventTypeGroupService } from './event-type-group.service';

describe('EventTypeGroupService', () => {
  let service: EventTypeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTypeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
