import { Routes } from "@angular/router";

export const SubjectRoutes: Routes = [
    {
        path: '',
        data: { breadcrumb: null },        
        children: [
            {
                path: '',
                loadComponent: () => import('./list/subject.component').then(m => m.SubjectComponent),
                data: { breadcrumb: null }
            },
            {
                path:'view/:id',
                loadComponent: () => import('./subject-detail-view/subject-detail-view.component').then(m => m.SubjectDetailViewComponent),
                data: { breadcrumb: 'Ver Asignatura' }
            }
        ]
    }
]