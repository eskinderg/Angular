import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: EventsComponent,
                canActivate: [AuthGuardService]
            }
        ])
    ],
    exports: [RouterModule]
})
export class EventsRoutingModule {}
