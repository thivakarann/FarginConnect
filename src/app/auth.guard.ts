import { CanActivateFn, Router } from '@angular/router';
import { FarginServiceService } from './service/fargin-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(FarginServiceService);
  const router = inject(Router);
  if (authService.getToken()) {
    return true;
  }
  // Redirect to the login page
  return router.parseUrl('/login-page');
}
