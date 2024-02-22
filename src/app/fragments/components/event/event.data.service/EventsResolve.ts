import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EventDataService } from './event.data.service';
import { Event } from '../event';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

@Injectable()
export class EventsResolve {
  constructor(private action$: Actions) {}

  resolve(route: ActivatedRouteSnapshot) {
    // this.store.dispatch({ type: 'FETCH_EVENTS', payload: {} });
    // return this.action$.ofType(EventsActions.FETCH_EVENTS_SUCCESS)
    //   .take(1);
    // return this.eventsDataService.getAllEvents().first();
  }
}
