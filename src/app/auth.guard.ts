import { CanActivateFn, Router } from '@angular/router';
import { FarginServiceService } from './service/fargin-service.service';
import { inject } from '@angular/core';
import { SessionValidatorService } from './Session storage Validator/session-validator.service';

// export const authGuard: CanActivateFn = () => {
//   const authService = inject(FarginServiceService);
//   const router = inject(Router);
//   if (authService.getToken()) {
//     return true;
//   }
//   return router.parseUrl('/login-page');


// }

export const authGuard: CanActivateFn = () => {
  const sessionValidator = inject(SessionValidatorService);
  const router = inject(Router);

  const sessionReady = sessionStorage.getItem('sessionReady') === 'true';
  const token = sessionStorage.getItem('One');

  if (sessionReady && token) {
    return true;
  }

  sessionStorage.clear();
  return router.parseUrl('/login-page');
};



