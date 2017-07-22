import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

import { Event } from '../event';
import { EventApiService } from './event.api.service';
import { AppStore } from '../../../../app-store.model';

@Injectable()
export class EventDataService {

  constructor( private api: EventApiService, private store: Store<AppStore>) {
        this.store.dispatch({ type: 'FETCH_EVENTS', payload: {} });
  }

  getAllEvents(): Observable<Event[]> {
        return this.store.select<Event[]>('events');
  }

  getEventById(eventId: number): Observable<Event> {
    return this.api.getEventById(eventId);
  }

  toggleEventComplete(event: Event) {
    return this.api.updateEvent(event);
  }

}
