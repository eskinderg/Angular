import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../components/shared/services/api.service';

import { ConfirmService } from '../../../../fragments/components/dialog/confirm.service';
import { Event } from 'src/app/models/event';

const API_URL = environment.EVENTS_API;

@Injectable()
export class EventDataService extends ApiService {

  constructor(private http: HttpClient, confirmService: ConfirmService) {
    super(http, confirmService);
  }

  public getAllEvents() {
    return this.http.get<Event[]>(API_URL)
  }

  public createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(API_URL, event)
  }

  public getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(API_URL + eventId)
  }

  public updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(API_URL, event)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  public toggleEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(API_URL + 'toggle/', event)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  public deleteEventById(event: Event): Observable<Event> {
    return this.http
      .delete<Event>(API_URL + event.id)
      .pipe(
        map(response => {
          return event;
        }),
        catchError(this.handleError)
      );
  }

  public deleteEvents(events: Event[]): Observable<Event[]> {
    return this.http
      .delete<Event[]>(API_URL, { body: events })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
}
