import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
// import { Store, Action } from '@ngrx/store';
import * as EventsActions from '../actions/event';
import { EventDataService } from '../theme/components/event/event.data.service/event.data.service';
import { ToastService } from '../shared/toast/toast.service';
import { Event } from '../models/event';

@Injectable()
export class EventsEffect {

  save = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.createEvent),
      switchMap(action =>
        this.eventsDataService.createEvent(action.payload).pipe(
          map((event: Event) => EventsActions.createEventSuccess({ payload: event })),
          catchError(err => of(EventsActions.createEventFail(err))
          )))));

  createEventSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.createEventSuccess),
      switchMap((action) => {
        this.toastService.showSuccess(action.payload.title, 'Event Added')
        return EMPTY;
      })), { dispatch: false });

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.updateEvent),
      switchMap((action) =>
        this.eventsDataService.updateEvent(action.payload.newValue)
          .pipe(map(event => EventsActions.updateEventSuccess({ payload: event })),
            catchError(err => of(EventsActions.updateEventFail(err)))
          ))));

  updateEventSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.updateEventSuccess),
      switchMap((action) => {
        this.toastService.showSuccess(action.payload.title, "Event Updated")
        return EMPTY;
      })), { dispatch: false });

  toggleEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.toggleEvent),
      switchMap((action) =>
        this.eventsDataService.toggleEvent(action.payload)
          .pipe(map(event => EventsActions.toggleEventSuccess({ payload: event })),
            catchError(err => of(EventsActions.toggleEventFail(err)))
          ))));

  toggleEventSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.toggleEventSuccess),
      switchMap((action) => {
        this.toastService.showSuccess(action.payload.title, 'Event Updated')
        return EMPTY;
      })), { dispatch: false });

  fetch = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.fetchEvents),
      switchMap(() => this.eventsDataService.getAllEvents()
        .pipe(map(events => EventsActions.fetchEventsSuccess({ payload: events })),
          catchError(err => of({ type: EventsActions.fetchEventsFailed.type, payload: err }))
        ))));

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.deleteEvent),
      switchMap((action) =>
        this.eventsDataService.deleteEventById(action.payload)
          .pipe(map(event => EventsActions.deleteEventSuccess({ payload: event })),
            catchError(err => of(EventsActions.deleteEventFail(err)))
          ))));

  constructor(
    private actions$: Actions,
    private eventsDataService: EventDataService,
    private toastService: ToastService
  ) { }

}
