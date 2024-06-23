import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { EventsDialogWrapperComponent } from './events-dialog/events-dialog-wrapper/events-dialog-wrapper.component';
import { EventsDialogComponent } from './events-dialog/events-dialog/events-dialog.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: EventsComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: 'dialog/:eventid',
                        component: EventsDialogWrapperComponent,
                        data: {
                            component: EventsDialogComponent
                        }
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class EventsRoutingModule {}
