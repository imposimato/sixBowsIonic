import { TestBed } from '@angular/core/testing';

import { BaseCategoriesService } from './base-categories.service';

describe('BaseCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseCategoriesService = TestBed.get(BaseCategoriesService);
    expect(service).toBeTruthy();
  });
});
