import { TestBed } from '@angular/core/testing';

import { ImageTypeService } from './image-type.service';

describe('ImageTypeService', () => {
  let service: ImageTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
