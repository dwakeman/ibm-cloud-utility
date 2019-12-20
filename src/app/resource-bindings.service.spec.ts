import { TestBed } from '@angular/core/testing';

import { ResourceBindingsService } from './resource-bindings.service';

describe('ResourceBindingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceBindingsService = TestBed.get(ResourceBindingsService);
    expect(service).toBeTruthy();
  });
});
