import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { EventsResolve } from '../../theme/components/event/event.data.service/EventsResolve';
import { EventDataService } from '../../theme/components/event/event.data.service/event.data.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        resolve: {
          events: EventsResolve
        }
      }
    ])
  ],
  providers: [EventDataService],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
