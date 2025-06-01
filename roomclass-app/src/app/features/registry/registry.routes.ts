import { Routes } from '@angular/router';

export const registerRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./registry.component').then(m => m.RegistryComponent)
  }
];