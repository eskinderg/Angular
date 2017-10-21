import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { EventsActions } from '../events.actions';
import { EventApiService } from '../event.data.service/event.api.service';

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
    .switchMap(({ payload }) =>
      this.eventsApiService.createEvent(payload.event)
      .map(event => this.eventActions.createEventSuccess(event))
      .catch(err => Observable.of(this.eventActions.createEventFail(err)))
    );

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType(EventsActions.UPDATE_EVENT)
    .switchMap(({ payload }) =>
      this.eventsApiService.updateEvent(payload.changes)
      .map(event => this.eventActions.updateEventSuccess(event))
      .catch(err => Observable.of(this.eventActions.createEventFail(err)))
    );

  @Effect()
  fetch: Observable<Action> = this.actions$
    .ofType(EventsActions.FETCH_EVENTS)
    .switchMap(() => this.eventsApiService.getAllEvents()
      .map(events => this.eventActions.fetchEventsSuccess(events))
      .catch(err => Observable.of({ type: EventsActions.FETCH_EVENTS_FAILURE, payload: err }))
    );

  @Effect()
  delete = this.actions$
    .ofType(EventsActions.DELETE_EVENT)
    .switchMap(({ payload }) =>
      this.eventsApiService.deleteEventById(payload.id)
      .map(event => this.eventActions.deleteEventSuccess(event))
      .catch(err => Observable.of(this.eventActions.deleteEventFail(err)))
    );


  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private eventsApiService: EventApiService,
    private eventActions: EventsActions) { }


}
