import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth';

export const guestGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.authChecked$.pipe(
        filter(checked => checked),
        take(1),
        map(() => {
            if (authService.isLoggedIn()) {
                return router.createUrlTree(['/books']);
            }

            return true;
        })
    );
};