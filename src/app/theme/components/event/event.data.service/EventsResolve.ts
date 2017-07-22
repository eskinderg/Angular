import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventDataService } from './event.data.service';
import { Event } from '../event';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AppStore } from '../../../../app-store.model';
import { EventsActions } from '../events.actions';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

@Injectable()
export class EventsResolve implements Resolve<any> {

  constructor(private store: Store<AppStore>, private action$: Actions, private eventsDataService: EventDataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    // this.store.dispatch({ type: 'FETCH_EVENTS', payload: {} });
    // return this.action$.ofType(EventsActions.FETCH_EVENTS_SUCCESS)
    //   .take(1);
    // return this.eventsDataService.getAllEvents().first();
  }
}
