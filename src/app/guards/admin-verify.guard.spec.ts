import { TestBed } from '@angular/core/testing';

import { AdminVerifyGuard } from './admin-verify.guard';

describe('AdminVerifyGuard', () => {
  let guard: AdminVerifyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminVerifyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
