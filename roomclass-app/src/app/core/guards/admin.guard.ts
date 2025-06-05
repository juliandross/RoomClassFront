import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage-service.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  if(storageService.isCoordinador()) {
    console.log('User is a coordinator, access granted.');
    return true;  
  }
  return router.createUrlTree(['/home']);
};
