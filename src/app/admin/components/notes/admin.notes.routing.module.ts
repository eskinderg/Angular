import { Routes } from '@angular/router';
import { adminGuard } from 'src/app/auth/auth.guard';
import { AdminDashboardComponent } from './admin.dashboard.component';

export const adminNotesRoutes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [adminGuard]
    }
];
