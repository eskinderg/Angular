import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import * as EventsActions from '../actions/event.action';
import { EventDataService } from '../../fragments/components/event/event.data.service/event.data.service';
import { ToastService } from '../../shared/toast/toast.service';
import { Event } from '../../models/event';

@Injectable()
export class EventsEffect {
  createEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.createEvent),
      switchMap((action) =>
        this.eventsDataService.createEvent(action.payload).pipe(
          map((event: Event) => EventsActions.createEventSuccess({ payload: event })),
          catchError((err) => of(EventsActions.createEventFail({ payload: err })))
        )
      )
    )
  );

  createEventSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventsActions.createEventSuccess),
        switchMap((action) => {
          this.toastService.showSuccess(action.payload.title, 'Event Added');
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  updateEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.updateEvent),
      switchMap((action) =>
        this.eventsDataService.updateEvent(action.payload.newValue).pipe(
          map((event) => EventsActions.updateEventSuccess({ payload: event })),
          catchError((err) => of(EventsActions.updateEventFail({ payload: err })))
        )
      )
    )
  );

  updateEventSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventsActions.updateEventSuccess),
        switchMap((action) => {
          this.toastService.showSuccess(action.payload.title, 'Event Updated');
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  toggleEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.toggleEvent),
      switchMap((action) =>
        this.eventsDataService.toggleEvent(action.payload).pipe(
          map((event) => EventsActions.toggleEventSuccess({ payload: event })),
          catchError((err) => of(EventsActions.toggleEventFail({ payload: err })))
        )
      )
    )
  );

  toggleEventSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventsActions.toggleEventSuccess),
        switchMap((action) => {
          this.toastService.showSuccess(action.payload.title, 'Event Updated');
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  fetchEvents = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.fetchEvents),
      switchMap(() => of(EventsActions.fetchEventsStart()))
    )
  );

  fetchEventsStart = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.fetchEventsStart),
      switchMap(() =>
        this.eventsDataService.getAllEvents().pipe(
          map((events) => EventsActions.fetchEventsSuccess({ payload: events })),
          catchError((err) => of({ type: EventsActions.fetchEventsFailed.type, payload: err }))
        )
      )
    )
  );

  fetchEventsSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.fetchEventsSuccess),
      switchMap(() => of(EventsActions.fetchEventsComplete()))
    )
  );

  deleteEvent = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.deleteEvent),
      switchMap((action) =>
        this.eventsDataService.deleteEventById(action.payload).pipe(
          map((event) => EventsActions.deleteEventSuccess({ payload: event })),
          catchError((err) => of(EventsActions.deleteEventFail({ payload: err })))
        )
      )
    )
  );

  deleteEvents = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.deleteEvents),
      switchMap((action) =>
        this.eventsDataService.deleteEvents(action.payload).pipe(
          map((event) => EventsActions.deleteEventsSuccess({ payload: event })),
          catchError((err) => of(EventsActions.deleteEventsFail({ payload: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private eventsDataService: EventDataService,
    private toastService: ToastService
  ) {}
}
