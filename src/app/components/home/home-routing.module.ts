import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { EventsResolve } from '../../theme/components/event/event.data.service/EventsResolve';
import { EventDataService } from '../../theme/components/event/event.data.service/event.data.service';
import { MoviesApiService } from '../movies/movies.service/movies.api.service';
import { TvsResolve } from '../movies/movies.service/tvs.resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        resolve: {
          events: EventsResolve,
          tvs: TvsResolve,
        }
      }
    ])
  ],
  providers: [MoviesApiService, EventDataService],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
