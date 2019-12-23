import { TestBed } from '@angular/core/testing';

import { KpKeysService } from './kp-keys.service';

describe('KpKeysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpKeysService = TestBed.get(KpKeysService);
    expect(service).toBeTruthy();
  });
});
