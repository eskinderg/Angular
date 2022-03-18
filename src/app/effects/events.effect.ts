import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
// import { Store, Action } from '@ngrx/store';
import * as EventsActions from '../actions/event';
import { EventDataService } from '../theme/components/event/event.data.service/event.data.service';

@Injectable()
export class EventsEffect {

  save = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.CREATE_EVENT),
      switchMap((action: EventsActions.CreateEvent) =>
        this.eventsDataService.createEvent(action.payload)
          .pipe(map(event => new EventsActions.CreateEventSuccess(event)),
            catchError(err => of(new EventsActions.CreateEventFail(err)))
          ))));

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.UPDATE_EVENT),
      switchMap((action: EventsActions.UpdateEvent) =>
        this.eventsDataService.updateEvent(action.payload.newValue)
          .pipe(map(event => new EventsActions.UpdateEventSuccess(event)),
            catchError(err => of(new EventsActions.UpdateEventFail(err)))
          ))));

  toggleEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.TOGGLE_EVENT),
      switchMap((action: EventsActions.ToggleEvent) =>
        this.eventsDataService.toggleEvent(action.payload)
          .pipe(map(event => new EventsActions.ToggleEventSuccess(event)),
            catchError(err => of(new EventsActions.ToggleEventFail(err)))
          ))));

  fetch = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.FETCH_EVENTS),
      switchMap(() => this.eventsDataService.getAllEvents()
        .pipe(map(events => new EventsActions.FetchEventsSuccess(events)),
          catchError(err => of({ type: EventsActions.FETCH_EVENTS_FAILURE, payload: err }))
        ))));

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.DELETE_EVENT),
      switchMap((action: EventsActions.DeleteEvent) =>
        this.eventsDataService.deleteEventById(action.payload)
          .pipe(map(event => new EventsActions.DeleteEventSuccess(event)),
            catchError(err => of(new EventsActions.DeleteEventFail(err)))
          ))));

  constructor(private actions$: Actions, private eventsDataService: EventDataService) { }

}
