import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event } from '../event';
import * as EventsActions from '../../../../store/actions/event.action';
import * as fromRoot from '../../../../store/reducers';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { EventListHeaderComponent } from './event-list-header/event-list-header.component';
import { CardComponent } from '../../card/card.component';
import { EventListComponent } from './event-list/event-list.component';
import { NgClass } from '@angular/common';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DIALOG_RESPONSE, DIALOG_SIGNS, DIALOG_TYPE } from 'src/app/shared/dialog/dialog.enum';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.scss'],
    imports: [EventListHeaderComponent, CardComponent, EventListComponent, NgClass, RouterOutlet]
})
export class EventComponent {
    @Input() events: Event[];

    public selectedEvents: Event[] = [];

    constructor(
        private store: Store<fromRoot.IAppState>,
        public router: ActivatedRoute,
        public route: Router,
        public dialogService: DialogService
    ) {}

    onAddEvent(event: Event) {
        this.store.dispatch(EventsActions.createEvent({ payload: event }));
    }

    onToggleEvent(event: Event) {
        this.store.dispatch(EventsActions.toggleEvent({ payload: event }));
    }

    onUpdateEvent(event: Event) {
        this.store.dispatch(EventsActions.updateEvent({ payload: event }));
    }

    onDeleteEvents() {
        this.store.dispatch(EventsActions.deleteEvents({ payload: this.selectedEvents }));
        this.selectedEvents = [];
    }

    onSelectEvent(item: { selected: boolean; event: Event }) {
        if (item.selected) {
            this.selectedEvents.push(item.event);
        } else {
            this.selectedEvents = this.selectedEvents.filter((e: Event) => e.id !== item.event.id);
        }
    }

    onRemoveEvent(event: Event) {
        // this.route.navigate(['/events', 'dialog', event.id], { state: { event: event } });
        this.dialogService
            .openDialog(
                'Delete Event',
                'Do you want to delete this Event?',
                DIALOG_TYPE.YES_NO,
                true,
                DIALOG_SIGNS.WARNING
            )
            .then((result) => {
                if (result === DIALOG_RESPONSE.YES) {
                    this.store.dispatch(EventsActions.deleteEvent({ payload: event }));
                }
            });
        // this.eventDialogService.showDialog(event);
        // alert(this.route.url)
        // this.confirmService.confirm({
        //   title: 'Confirm deletion',
        //   message: 'Do you really want to delete the item ' + '"' + event.title + '"?',
        //   backdrop: true,
        //   centered: false
        // }).then(() => {
        //   this.store.dispatch(EventsActions.deleteEvent({ payload: event }));
        // }, () => {
        //   console.log();
        // });
    }
}
