import { TestBed } from '@angular/core/testing';

import { DataForChartsService } from './data-for-charts.service';

describe('DataForChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataForChartsService = TestBed.get(DataForChartsService);
    expect(service).toBeTruthy();
  });
});
