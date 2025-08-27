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
                eventsDataService.createEvent(action.event).pipe(
                    map((event: Event) => EventsActions.createEventSuccess({ event: event })),
                    catchError((err) => of(EventsActions.createEventFail({ event: err })))
                )
            )
        )
    );

    createEventSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(EventsActions.createEventSuccess),
                switchMap((action) => {
                    notificationService.showSuccess(action.event.title, 'Event Added');
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
                    map((event) => EventsActions.updateEventSuccess({ event: event })),
                    catchError((err) => of(EventsActions.updateEventFail({ event: err })))
                )
            )
        )
    );

    updateEventSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(EventsActions.updateEventSuccess),
                switchMap((action) => {
                    notificationService.showSuccess(action.event.title, 'Event Updated');
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
                    map((event) => EventsActions.toggleEventSuccess({ event: event })),
                    catchError((err) => of(EventsActions.toggleEventFail({ event: err })))
                )
            )
        )
    );

    toggleEventSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(EventsActions.toggleEventSuccess),
                switchMap((action) => {
                    notificationService.showSuccess(action.event.title, 'Event Updated');
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
                        map((events) => EventsActions.fetchEventsSuccess({ events: events })),
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
                eventsDataService.deleteEventById(action.event).pipe(
                    map((event) => EventsActions.deleteEventSuccess({ event: event })),
                    catchError((err) => of(EventsActions.deleteEventFail({ event: err })))
                )
            )
        )
    );

    deleteEvents = createEffect((actions$ = inject(Actions), eventsDataService = inject(EventDataService)) =>
        actions$.pipe(
            ofType(EventsActions.deleteEvents),
            switchMap((action) =>
                eventsDataService.deleteEvents(action.events).pipe(
                    map((event) => EventsActions.deleteEventsSuccess({ events: event })),
                    catchError((err) => of(EventsActions.deleteEventsFail({ events: err })))
                )
            )
        )
    );
}
