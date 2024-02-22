import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions } from '@ngrx/effects';

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
