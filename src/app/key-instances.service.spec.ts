import { TestBed } from '@angular/core/testing';

import { KeyInstancesService } from './key-instances.service';

describe('KeyInstancessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyInstancesService = TestBed.get(KeyInstancesService);
    expect(service).toBeTruthy();
  });
});
