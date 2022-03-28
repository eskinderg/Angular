import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
// import { Store, Action } from '@ngrx/store';
import * as EventsActions from '../actions/event';
import { EventDataService } from '../theme/components/event/event.data.service/event.data.service';
import { ToastService } from '../shared/toast/toast.service';

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

  createEventSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.CREATE_EVENT_SUCCESS),
      switchMap((action: EventsActions.CreateEventSuccess) => {
        this.toastService.showSuccess(action.payload.title, 'Event Added')
        return EMPTY;
      })), { dispatch: false });

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.UPDATE_EVENT),
      switchMap((action: EventsActions.UpdateEvent) =>
        this.eventsDataService.updateEvent(action.payload.newValue)
          .pipe(map(event => new EventsActions.UpdateEventSuccess(event)),
            catchError(err => of(new EventsActions.UpdateEventFail(err)))
          ))));

  updateEventSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.UPDATE_EVENT_SUCCESS),
      switchMap((action: EventsActions.UpdateEventSuccess) => {
        this.toastService.showSuccess(action.payload.title, "Event Updated")
        return EMPTY;
      })), { dispatch: false });

  toggleEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.TOGGLE_EVENT),
      switchMap((action: EventsActions.ToggleEvent) =>
        this.eventsDataService.toggleEvent(action.payload)
          .pipe(map(event => new EventsActions.ToggleEventSuccess(event)),
            catchError(err => of(new EventsActions.ToggleEventFail(err)))
          ))));

  toggleEventSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.TOGGLE_EVENT_SUCCESS),
      switchMap((action: EventsActions.ToggleEventSuccess) => {
        this.toastService.showSuccess(action.payload.title, 'Event Updated')
        return EMPTY;
      })), { dispatch: false });

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

  constructor(
    private actions$: Actions,
    private eventsDataService: EventDataService,
    private toastService: ToastService
  ) { }

}
