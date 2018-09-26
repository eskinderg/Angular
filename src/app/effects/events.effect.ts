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
      switchMap((action: EventsActions.CreateEvent) =>
        this.eventsDataService.createEvent(action.payload)
        .pipe(
          map(event => new EventsActions.CreateEventSuccess(event)),
          catchError(err => of(new EventsActions.CreateEventFail(err)))
        )
      )
    );

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType(EventsActions.UPDATE_EVENT)
    .pipe(
      switchMap((action: EventsActions.UpdateEvent) =>
        this.eventsDataService.updateEvent(action.payload.newValue)
        .pipe(
          map(event => new EventsActions.UpdateEventSuccess(event)),
          catchError(err => of(new EventsActions.UpdateEventFail(err)))
        )
      )
    );

  @Effect()
  toggleEvent: Observable<Action> = this.actions$
    .ofType(EventsActions.TOGGLE_EVENT)
    .pipe(
      switchMap((action: EventsActions.ToggleEvent) =>
        this.eventsDataService.toggleEvent(action.payload)
        .pipe(
          map(event => new EventsActions.ToggleEventSuccess(event)),
          catchError(err => of(new EventsActions.ToggleEventFail(err)))
        )
      )
    );

  @Effect()
  fetch: Observable<Action> = this.actions$
    .ofType(EventsActions.FETCH_EVENTS)
    .pipe(
      switchMap(() => this.eventsDataService.getAllEvents()
        .pipe(
          map(events => new EventsActions.FetchEventsSuccess(events)),
          catchError(err => of({ type: EventsActions.FETCH_EVENTS_FAILURE, payload: err }))
        )
      )
    );

  @Effect()
  delete = this.actions$
    .ofType(EventsActions.DELETE_EVENT)
    .pipe(
      switchMap((action: EventsActions.DeleteEvent) =>
        this.eventsDataService.deleteEventById(action.payload)
        .pipe(
          map(event => new EventsActions.DeleteEventSuccess(event)),
          catchError(err => of(new EventsActions.DeleteEventFail(err)))
        )
      )
    );

  constructor( private actions$: Actions, private eventsDataService: EventDataService) { }

}
