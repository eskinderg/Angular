import { Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { authGuard } from '../../auth/auth.guard';

export const eventsRoutes: Routes = [
    {
        path: '',
        component: EventsComponent,
        canActivate: [authGuard]
    }
];
