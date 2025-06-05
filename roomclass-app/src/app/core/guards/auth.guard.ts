import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../services/storage-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const isAuthenticated = storageService.isAuthenticated();
  if (!isAuthenticated) {
    authService.logout();
    return false;
  }  
  return true;
};


