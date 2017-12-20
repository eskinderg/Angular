import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import * as EventsActions from '../actions/event';
import { EventDataService } from '../theme/components/event/event.data.service/event.data.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class EventsEffect {

  @Effect()
  save = this.actions$
    .ofType(EventsActions.CREATE_EVENT)
    .switchMap((action: EventsActions.createEvent) =>
      this.eventsDataService.createEvent(action.payload)
        .map(event => new EventsActions.createEventSuccess(event))
        .catch(err => Observable.of(new EventsActions.createEventFail(err)))
    );

    @Effect()
    update: Observable<Action> = this.actions$
      .ofType(EventsActions.UPDATE_EVENT)
      .switchMap((action: EventsActions.updateEvent) =>
        this.eventsDataService.updateEvent(action.payload)
          .map(event => new EventsActions.updateEventSuccess(event))
          .catch(err => Observable.of(new EventsActions.updateEventFail(err)))
      );

      @Effect()
      fetch: Observable<Action> = this.actions$
        .ofType(EventsActions.FETCH_EVENTS)
        .switchMap(() => this.eventsDataService.getAllEvents()
          .map(events => new EventsActions.fetchEventsSuccess(events))
          .catch(err => Observable.of({ type: EventsActions.FETCH_EVENTS_FAILURE, payload: err }))
        );

        @Effect()
        delete = this.actions$
          .ofType(EventsActions.DELETE_EVENT)
          .switchMap((action: EventsActions.deleteEvent) =>
            this.eventsDataService.deleteEventById(action.payload)
              .map(event => new EventsActions.deleteEventSuccess(event))
              .catch(err => Observable.of(new EventsActions.deleteEventFail(err)))
          );

          constructor( private actions$: Actions, private eventsDataService: EventDataService) { }

}
