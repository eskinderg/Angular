import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Event } from '../event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../../environments/environment';


const API_URL = environment.TODO_API;

@Injectable()
export class EventDataService {

  constructor(private http: HttpClient) { }

  //getEvents(): Observable<Array<Event>> {
  //return this.http.get(API_URL + '/todos')
  //.map((response: Response) => response.json());
  //}

  /**
   * Envoked from the effector for fetching all the events
   **/
  public getAllEvents()  {
    return this.http .get(API_URL + '/todos')
      .map(response => { return response; })
      .catch(this.handleError);
  }

  public createEvent(event: Event): Observable<Event> {
    return this.http
    .post(API_URL + '/todos', event)
    .map(response => {
      return new Event(response);
    })
    .catch(this.handleError);
  }

  public getEventById(eventId: number): Observable<Event> {
    return this.http
    .get(API_URL + '/todos/' + eventId)
    .map(response => {
      return new Event(response);
    })
    .catch(this.handleError);
  }

  public updateEvent(event: Event): Observable<Event> {
    return this.http
    .put(API_URL + '/todos/' + event.id, event)
    .map(response => {
      return new Event(response);
    })
    .catch(this.handleError);
  }

  public deleteEventById(event: Event): Observable<Event> {
    return this.http
    .delete(API_URL + '/todos/' + event.id)
    .map(response => {
      return event;
    })
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
