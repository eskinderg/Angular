import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Event } from '../event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../../environments/environment';

const API_URL = environment.TODO_API;

@Injectable()
export class EventApiService {

  constructor(
    private http: Http
  ) {
  }

  public getAllEvents(): Observable<Event[]> {
    return this.http
      .get(API_URL + '/todos')
      .map(response => {
        const events = response.json();
        return events.map((event: Event) => new Event(event));
      })
      .catch(this.handleError);
  }

  public createEvent(event: Event): Observable<Event> {
    return this.http
      .post(API_URL + '/todos', event)
      .map(response => {
        return new Event(response.json());
      })
      .catch(this.handleError);
  }

  public getEventById(eventId: number): Observable<Event> {
    return this.http
      .get(API_URL + '/todos/' + eventId)
      .map(response => {
        return new Event(response.json());
      })
      .catch(this.handleError);
  }

  public updateEvent(event: Event): Observable<Event> {
    return this.http
      .put(API_URL + '/todos/' + event.id, event)
      .map(response => {
        return new Event(response.json());
      })
      .catch(this.handleError);
  }

  public deleteEventById(eventId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + eventId)
      .map(response => null)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
