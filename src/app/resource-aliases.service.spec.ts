import { TestBed } from '@angular/core/testing';

import { ResourceAliasesService } from './resource-aliases.service';

describe('ServiceAliasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceAliasesService = TestBed.get(ResourceAliasesService);
    expect(service).toBeTruthy();
  });
});
