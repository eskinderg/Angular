import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { from, of, Observable, Subject, pipe } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import * as EventsActions from '../actions/event';
import { EventDataService } from '../theme/components/event/event.data.service/event.data.service';

@Injectable()
export class EventsEffect {

  @Effect()
  save = this.actions$
    .ofType(EventsActions.CREATE_EVENT)
    .pipe(
      switchMap((action: EventsActions.createEvent) =>
        this.eventsDataService.createEvent(action.payload)
        .pipe(
          map(event => new EventsActions.createEventSuccess(event)),
          catchError(err => of(new EventsActions.createEventFail(err)))
        )
      )
    );

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType(EventsActions.UPDATE_EVENT)
    .pipe(
      switchMap((action: EventsActions.updateEvent) =>
        this.eventsDataService.updateEvent(action.payload.newValue)
        .pipe(
          map(event => new EventsActions.updateEventSuccess(event)),
          catchError(err => of(new EventsActions.updateEventFail(err)))
        )
      )
    );

  @Effect()
  toggleEvent: Observable<Action> = this.actions$
    .ofType(EventsActions.TOGGLE_EVENT)
    .pipe(
      switchMap((action: EventsActions.toggleEvent) =>
        this.eventsDataService.toggleEvent(action.payload)
        .pipe(
          map(event => new EventsActions.toggleEventSuccess(event)),
          catchError(err => of(new EventsActions.toggleEventFail(err)))
        )
      )
    );

  @Effect()
  fetch: Observable<Action> = this.actions$
    .ofType(EventsActions.FETCH_EVENTS)
    .pipe(
      switchMap(() => this.eventsDataService.getAllEvents()
        .pipe(
          map(events => new EventsActions.fetchEventsSuccess(events)),
          catchError(err => of({ type: EventsActions.FETCH_EVENTS_FAILURE, payload: err }))
        )
      )
    );

  @Effect()
  delete = this.actions$
    .ofType(EventsActions.DELETE_EVENT)
    .pipe(
      switchMap((action: EventsActions.deleteEvent) =>
        this.eventsDataService.deleteEventById(action.payload)
        .pipe(
          map(event => new EventsActions.deleteEventSuccess(event)),
          catchError(err => of(new EventsActions.deleteEventFail(err)))
        )
      )
    );

  constructor( private actions$: Actions, private eventsDataService: EventDataService) { }

}
