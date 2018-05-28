
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Event } from '../event';
import { catchError, debounceTime, distinctUntilChanged,switchMap, map, takeUntil, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

const API_URL = environment.EVENTS_API;

@Injectable()
export class EventDataService {

  constructor(private http: HttpClient) { }

  public getAllEvents()  {
    return this.http .get<Event[]>(API_URL)
  }

  public createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(API_URL , event)
  }

  public getEventById(eventId: number): Observable<Event> {
    return this.http .get<Event>(API_URL + eventId)
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

  private handleError (error: Response | any) {
    console.error('EventDataApiService Error::handleError', error);
    return observableThrowError(error);
  }
}
