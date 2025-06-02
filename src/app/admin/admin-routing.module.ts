import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin.dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { AdminNotesResolver } from './resolvers/admin-notes.resolver';
import { UsersComponent } from './components/users/users.component';
import { AdminUsersResolver } from './resolvers/users.resolver';

export const adminRoutes: Routes = [
    {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminGuard],
        resolve: {
            notes: AdminNotesResolver
        }
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [adminGuard],
        resolve: {
            users: AdminUsersResolver
        }
    }
];
