import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/notes/admin.dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { AdminNotesResolver } from './resolvers/admin-notes.resolver';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [adminGuard],
        resolve: {
            notes: AdminNotesResolver
        }
    }
];
