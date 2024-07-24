import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Event } from 'src/app/fragments/components/event/event';
import * as fromRoot from '../../../../store/reducers';
import * as EventsActions from '../../../../store/actions/event.action';
import { Location } from '@angular/common';

@Component({
    selector: 'app-events-dialog',
    templateUrl: './events-dialog.component.html',
    styleUrl: './events-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsDialogComponent {
    public Event: Event;

    constructor(
        private router: Router,
        private store: Store<fromRoot.IAppState>,
        private location: Location
    ) {
        if (this.router.getCurrentNavigation() == null) {
            // this.location.go('./events');
            return;
        }

        if (this.router.getCurrentNavigation() != null) {
            this.Event = this.router.getCurrentNavigation().extras.state['event'];
        }
        // this.location.go('./events')
        // console.log(this.Event)
    }

    no() {}

    yes() {
        this.store.dispatch(EventsActions.deleteEvent({ payload: this.Event }));
    }
}
