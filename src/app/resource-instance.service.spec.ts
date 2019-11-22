import { TestBed } from '@angular/core/testing';

import { ResourceInstanceService } from './resource-instance.service';

describe('ResourceInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceInstanceService = TestBed.get(ResourceInstanceService);
    expect(service).toBeTruthy();
  });
});
