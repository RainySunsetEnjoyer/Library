import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map(isLoggedIn =>
      isLoggedIn
        ? true
        : router.createUrlTree(['/login'])
    )
  );
};