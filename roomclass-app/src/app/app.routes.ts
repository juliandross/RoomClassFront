import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.routes').then(m => m.loginRoutes)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
            { path: 'asignaturas', loadComponent: () => import('./features/asignaturas/asignaturas.component').then(m => m.AsignaturasComponent) },
            { path: 'docentes', loadComponent: () => import('./features/docentes/docentes.component').then(m => m.DocentesComponent) },
            { path: 'programa', loadComponent: () => import('./features/programa/programa.component').then(m => m.ProgramaComponent) },
        ]
    },
];
