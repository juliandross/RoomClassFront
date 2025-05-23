import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated();
  if (!isAuthenticated) {
    authService.logout();
    return false;
  }
  console.log('User is authenticated');
  return true;
};


