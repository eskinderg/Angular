import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin.dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { UsersComponent } from './components/users/users.component';

export const adminRoutes: Routes = [
    {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [adminGuard]
    }
];
