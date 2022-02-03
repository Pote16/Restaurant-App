import { TestBed } from '@angular/core/testing';

import { MenuitemsstatusService } from './menuitemsstatus.service';

describe('MenuitemsstatusService', () => {
  let service: MenuitemsstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuitemsstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
