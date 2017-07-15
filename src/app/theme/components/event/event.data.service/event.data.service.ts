import { Injectable } from '@angular/core';
import { Event } from '../event';
import { EventApiService } from './event.api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventDataService {

  constructor(
    private api: EventApiService
  ) {
  }

  // Simulate POST /events
  addEvent(event: Event): Observable<Event> {
    return this.api.createEvent(event);
  }

  // Simulate DELETE /events/:id
  deleteEventById(eventId: number): Observable<Event> {
    return this.api.deleteEventById(eventId);
  }

  // Simulate PUT /events/:id
  updateEvent(event: Event): Observable<Event> {
    return this.api.updateEvent(event);
  }

  // Simulate GET /events
  getAllEvents(): Observable<Event[]> {
    return this.api.getAllEvents();
  }

  // Simulate GET /events/:id
  getEventById(eventId: number): Observable<Event> {
    return this.api.getEventById(eventId);
  }

  // Toggle complete
  toggleEventComplete(event: Event) {
    event.complete = !event.complete;
    return this.api.updateEvent(event);
  }

}
