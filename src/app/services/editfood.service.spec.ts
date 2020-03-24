import { TestBed } from '@angular/core/testing';

import { EditfoodService } from './editfood.service';

describe('EditfoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditfoodService = TestBed.get(EditfoodService);
    expect(service).toBeTruthy();
  });
});
