import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AppModule } from '../app.module';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [
      AppModule
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
