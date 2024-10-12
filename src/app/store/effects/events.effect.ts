import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import * as EventsActions from '../actions/event.action';
import { EventDataService } from '../../fragments/components/event/event.data.service/event.data.service';
import { NotificationService } from '../../shared/notification/notification.service';
import { Event } from '../../fragments/components/event/event';

@Injectable()
export class EventsEffect {
    createEvent = createEffect((actions$ = inject(Actions), eventsDataService = inject(EventDataService)) =>
        actions$.pipe(
            ofType(EventsActions.createEvent),
            switchMap((action) =>
                eventsDataService.createEvent(action.payload).pipe(
                    map((event: Event) => EventsActions.createEventSuccess({ payload: event })),
                    catchError((err) => of(EventsActions.createEventFail({ payload: err })))
                )
            )
        )
    );

    createEventSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(EventsActions.createEventSuccess),
                switchMap((action) => {
                    notificationService.showSuccess(action.payload.title, 'Event Added');
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    updateEvent = createEffect((actions$ = inject(Actions), eventsDataService = inject(EventDataService)) =>
        actions$.pipe(
            ofType(EventsActions.updateEvent),
            switchMap((action) =>
                eventsDataService.updateEvent(action.payload.newValue).pipe(
                    map((event) => EventsActions.updateEventSuccess({ payload: event })),
                    catchError((err) => of(EventsActions.updateEventFail({ payload: err })))
                )
            )
        )
    );

    updateEventSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(EventsActions.updateEventSuccess),
                switchMap((action) => {
                    notificationService.showSuccess(action.payload.title, 'Event Updated');
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    toggleEvent = createEffect((actions$ = inject(Actions), eventsDataService = inject(EventDataService)) =>
        actions$.pipe(
            ofType(EventsActions.toggleEvent),
            switchMap((action) =>
                eventsDataService.toggleEvent(action.payload).pipe(
                    map((event) => EventsActions.toggleEventSuccess({ payload: event })),
                    catchError((err) => of(EventsActions.toggleEventFail({ payload: err })))
                )
            )
        )
    );

    toggleEventSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(EventsActions.toggleEventSuccess),
                switchMap((action) => {
                    notificationService.showSuccess(action.payload.title, 'Event Updated');
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    fetchEvents = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(EventsActions.fetchEvents),
            switchMap(() => of(EventsActions.fetchEventsStart()))
        )
    );

    fetchEventsStart = createEffect(
        (actions$ = inject(Actions), eventsDataService = inject(EventDataService)) =>
            actions$.pipe(
                ofType(EventsActions.fetchEventsStart),
                switchMap(() =>
                    eventsDataService.getAllEvents().pipe(
                        map((events) => EventsActions.fetchEventsSuccess({ payload: events })),
                        catchError((err) => of({ type: EventsActions.fetchEventsFailed.type, payload: err }))
                    )
                )
            )
    );

    fetchEventsSuccess = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(EventsActions.fetchEventsSuccess),
            switchMap(() => of(EventsActions.fetchEventsComplete()))
        )
    );

    deleteEvent = createEffect((actions$ = inject(Actions), eventsDataService = inject(EventDataService)) =>
        actions$.pipe(
            ofType(EventsActions.deleteEvent),
            switchMap((action) =>
                eventsDataService.deleteEventById(action.payload).pipe(
                    map((event) => EventsActions.deleteEventSuccess({ payload: event })),
                    catchError((err) => of(EventsActions.deleteEventFail({ payload: err })))
                )
            )
        )
    );

    deleteEvents = createEffect((actions$ = inject(Actions), eventsDataService = inject(EventDataService)) =>
        actions$.pipe(
            ofType(EventsActions.deleteEvents),
            switchMap((action) =>
                eventsDataService.deleteEvents(action.payload).pipe(
                    map((event) => EventsActions.deleteEventsSuccess({ payload: event })),
                    catchError((err) => of(EventsActions.deleteEventsFail({ payload: err })))
                )
            )
        )
    );
}
