import { TestBed } from '@angular/core/testing';

import { CalendarTypeService } from './calendar-type.service';

describe('CalendarTypeService', () => {
  let service: CalendarTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
