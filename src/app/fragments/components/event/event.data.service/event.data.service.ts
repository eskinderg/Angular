import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../components/shared/services/api.service';
import { Event } from 'src/app/fragments/components/event/event';

const EVENTS_API_URL = environment.EVENTS_API_URL;

@Injectable({ providedIn: 'root' })
export class EventDataService extends ApiService {
    private http = inject(HttpClient);

    public getAllEvents() {
        return this.http.get<Event[]>(EVENTS_API_URL);
    }

    public createEvent(event: Event): Observable<Event> {
        // return this.http.post<Event[]>(EVENTS_API_URL, event).pipe(map((response) => response.shift()));
        return this.updateEvent(event);
    }

    public getEventById(eventId: number): Observable<Event> {
        return this.http.get<Event>(EVENTS_API_URL + eventId);
    }

    public updateEvent(event: Event): Observable<Event> {
        return this.http.put<Event[]>(EVENTS_API_URL + '/upsert', [event]).pipe(
            map((response) => {
                return response.shift();
            }),
            catchError(this.handleError)
        );
    }

    public toggleEvent(event: Event): Observable<Event> {
        return this.updateEvent(event);
    }

    public deleteEventById(event: Event): Observable<Event> {
        return this.updateEvent(event);
        // return this.http.delete<Event>(EVENTS_API_URL + '/' + event.event_id).pipe(
        //     map(() => {
        //         return event;
        //     }),
        //     catchError(this.handleError)
        // );
    }

    public deleteEvents(events: Event[]): Observable<Event[]> {
        return this.http.delete<Event[]>(EVENTS_API_URL, { body: events }).pipe(
            map((response) => {
                return response;
            }),
            catchError(this.handleError)
        );
    }
}
