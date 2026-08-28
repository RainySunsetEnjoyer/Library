import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authChecked$.pipe(
    filter(checked => checked),
    take(1),
    map(() => {
      return authService.isLoggedIn()
        ? true
        : router.createUrlTree(['/login']);
    })
  );
};