import { TestBed } from '@angular/core/testing';

import { ManageMediaService } from './manage-media.service';

describe('ManageMediaService', () => {
  let service: ManageMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
