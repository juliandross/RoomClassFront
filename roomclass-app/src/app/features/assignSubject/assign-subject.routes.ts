import { Routes } from "@angular/router";

export const AssignSubjectRoutes: Routes = [
    {
        path: '',
        data: { breadcrumb: null },        
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/list/assign-subject.component').then(m => m.AssignSubjectComponent),
                data: { breadcrumb: null }
            },
            {
                path:'view/:id',                
                data: { breadcrumb: 'Ver Asignación' },
                children: [
                {
                    path: '',
                    loadComponent: () => import('./pages/view/assign-subject-view.component').then(m => m.AssignSubjectViewComponent),
                    data: { breadcrumb: null },
                },
                {
                    path:'viewRA/:raId',
                    loadComponent: () => import('../../features/RA/ra.component').then(m => m.RaComponent),
                    data: { breadcrumb: 'Ver RA' }
                }
            ]                
            },                        
        ]
    }
]