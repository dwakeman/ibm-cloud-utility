import { TestBed } from '@angular/core/testing';

import { KpInstancesService } from './kp-instances.service';

describe('KpInstancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpInstancesService = TestBed.get(KpInstancesService);
    expect(service).toBeTruthy();
  });
});
