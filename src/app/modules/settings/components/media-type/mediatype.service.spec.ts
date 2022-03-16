import { TestBed } from '@angular/core/testing';

import { MediatypeService } from './mediatype.service';

describe('MediatypeService', () => {
  let service: MediatypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediatypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
