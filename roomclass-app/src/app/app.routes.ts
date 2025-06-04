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
            {
            path: 'perfil',
            loadComponent: () => import('./features/user-profile/user-profile.component').then(m => m.UserProfileComponent),
            data: { breadcrumb: 'Mi Perfil' }
            },
            { path: 'asignaturas', 
                loadComponent: () => import('./features/subjects/subject.component').then(m => m.SubjectComponent), 
                data: { breadcrumb: 'Asignaturas' }
            },                
            { 
                path: 'docentes',
                data: { breadcrumb: 'Docentes' },
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./features/docentes/docentes.component').then(m => m.DocentesComponent)
                    },
                    {
                        path: 'crear',
                        loadComponent: () => import('./features/docentes/create-view-docentes/create-view-docentes.component').then(m => m.CreateViewDocentesComponent),
                        data: { breadcrumb: 'Crear Docente' }
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./features/docentes/detail-view-docentes/detail-view-docentes.component').then(m => m.DetailViewDocentesComponent),
                        data: { breadcrumb: 'Detalle Docente' }
                    },
                    {
                        path: 'editar/:id',
                        loadComponent: () => import('./features/docentes/edit-view-docentes/edit-view-docentes.component').then(m => m.EditViewDocentesComponent),
                        data: { breadcrumb: 'Editar Docente' }
                    }
                ]
            },
            { path: 'programa', 
                loadComponent: () => import('./features/programa/programa.component').then(m => m.ProgramaComponent), 
                data: { breadcrumb: 'Programa' }
            },
            { path: 'asignar_materia', 
                loadChildren: () => import('./features/assignSubject/assign-subject.routes').then(m => m.AssignSubjectRoutes), 
                data: { breadcrumb: 'Asignaciones' }
            },
        ]
    },
];
