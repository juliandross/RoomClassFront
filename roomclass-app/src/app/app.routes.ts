import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.routes').then(m => m.loginRoutes)
    },
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    }
];
