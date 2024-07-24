import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import * as fromEvents from '../../../../store/reducers/events.reducer';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-events-dialog-wrapper',
    templateUrl: './events-dialog-wrapper.component.html',
    styleUrl: './events-dialog-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsDialogWrapperComponent implements OnDestroy {
    destroy = new Subject<any>();

    constructor(
        private location: Location,
        private store: Store<fromEvents.IEventsState>
    ) {}

    ngOnDestroy(): void {
        this.destroy.next(undefined);
    }
}
