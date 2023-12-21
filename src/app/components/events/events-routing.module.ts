import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { EventsModalWrapperComponent } from './events-modal/events-modal-wrapper/events-modal-wrapper.component';
import { EventsModalComponent } from './events-modal/events-modal/events-modal.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EventsComponent,
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'modal/:eventid',
            component: EventsModalWrapperComponent,
            data: {
              component: EventsModalComponent
            }
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
