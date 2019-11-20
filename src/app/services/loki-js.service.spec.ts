import { TestBed } from '@angular/core/testing';

import { LokiJSService } from './loki-js.service';

describe('LokiJSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LokiJSService = TestBed.get(LokiJSService);
    expect(service).toBeTruthy();
  });
});
