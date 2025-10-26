import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // If not logged in, send to login and keep where they tried to go
  if (!token) {
    return router.createUrlTree(
      ['/login'],
      { queryParams: { returnUrl: state.url } }
    );
  }

  // If route didn’t specify roles, any authenticated user is allowed
  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  // Enforce role
  if (role && allowedRoles.includes(role)) {
    return true;
  }

  // Logged in but wrong role
  return router.createUrlTree(['/login']);
};
