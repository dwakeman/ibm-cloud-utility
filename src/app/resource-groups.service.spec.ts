import { TestBed } from '@angular/core/testing';

import { ResourceGroupsService } from './resource-groups.service';

describe('ResourceGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceGroupsService = TestBed.get(ResourceGroupsService);
    expect(service).toBeTruthy();
  });
});
