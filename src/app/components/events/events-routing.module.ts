import { Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { authGuard } from '../shared/services/auth/auth-guard.service';

export const eventsRoutes: Routes = [
    {
        path: '',
        component: EventsComponent,
        canActivate: [authGuard]
    }
];
