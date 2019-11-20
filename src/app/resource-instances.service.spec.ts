import { TestBed } from '@angular/core/testing';

import { ResourceInstancesService } from './resource-instances.service';

describe('ResourceInstancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceInstancesService = TestBed.get(ResourceInstancesService);
    expect(service).toBeTruthy();
  });
});
