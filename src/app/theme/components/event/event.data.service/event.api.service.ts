import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

import { Event } from '../event';

// import * as fromRoot from '../../../../reducers';
import * as fromEvents from '../../../../reducers/events';

@Injectable()
export class EventApiService {

  constructor(private store: Store<fromEvents.State>) {
    this.store.dispatch({ type: 'FETCH_EVENTS' });
  }

  getAllEvents(): Observable<Event[]> {
    return this.store.select(fromEvents.getEvents);
  }

  //getEventById(eventId: number): Observable<Event> {
  //return this.api.getEventById(eventId);
  //}
  //
  //toggleEventComplete(event: Event) {
  //return this.api.updateEvent(event);
  //}

  }
