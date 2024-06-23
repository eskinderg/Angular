import { Injectable } from '@angular/core';

@Injectable()
export class EventsResolve {
    constructor() {}

    resolve() {
        // this.store.dispatch({ type: 'FETCH_EVENTS', payload: {} });
        // return this.action$.ofType(EventsActions.FETCH_EVENTS_SUCCESS)
        //   .take(1);
        // return this.eventsDataService.getAllEvents().first();
    }
}
