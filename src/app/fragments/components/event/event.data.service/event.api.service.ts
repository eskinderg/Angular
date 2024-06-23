import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Event } from '../event';

// import * as fromRoot from '../../../../reducers';
import * as fromEvents from '../../../../store/reducers/events.reducer';

@Injectable()
export class EventApiService {
    constructor(private store: Store<fromEvents.IEventsState>) {
        this.store.dispatch({ type: 'FETCH_EVENTS' });
    }

    getAllEvents(): Observable<Event[]> {
        return this.store.select(fromEvents.getEvents);
    }

    // getEventById(eventId: number): Observable<Event> {
    // return this.api.getEventById(eventId);
    // }

    // toggleEventComplete(event: Event) {
    // return this.api.updateEvent(event);
    // }
}
