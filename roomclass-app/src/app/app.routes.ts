import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.routes').then(m => m.loginRoutes)
    },
    {
        path: 'registry',
        loadChildren: () => import('./features/registry/registry.routes').then(m => m.registerRoutes)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: LayoutComponent,
        canActivate: [authGuard],        
        data: { breadcrumb: 'Home' },
        children: [
            { path: '', 
                loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) ,
                data: { breadcrumb: null },
            },
            { path: 'asignaturas', 
                loadComponent: () => import('./features/subjects/subject.component').then(m => m.SubjectComponent), 
                data: { breadcrumb: 'Asignaturas' }
            },                
            { path: 'docentes',
                loadComponent: () => import('./features/docentes/docentes.component').then(m => m.DocentesComponent), 
                data: { breadcrumb: 'Docentes' }
            },
            { path: 'programa', 
                loadComponent: () => import('./features/programa/programa.component').then(m => m.ProgramaComponent), 
                data: { breadcrumb: 'Programa' }
            },
            { path: 'asignar_materia', 
                loadComponent: () => import('./features/assignSubject/assign-subject.component').then(m => m.AssignSubjectComponent), 
                data: { breadcrumb: 'Asignaciones' }
            },
        ]
    },
];
