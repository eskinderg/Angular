import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event } from '../event';
import * as EventsActions from '../../../../store/actions/event.action';
import * as fromRoot from '../../../../store/reducers';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { EventDialogService } from 'src/app/components/events/event-dialog/event.dialog.service';
import { EventListHeaderComponent } from './event-list-header/event-list-header.component';
import { CardComponent } from '../../card/card.component';
import { EventListComponent } from './event-list/event-list.component';
import { NgClass } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.scss'],
    standalone: true,
    imports: [EventListHeaderComponent, CardComponent, EventListComponent, NgClass, RouterOutlet]
})
export class EventComponent {
    @Input() events: Event[];

    public selectedEvents: Event[] = [];

    constructor(
        private store: Store<fromRoot.IAppState>,
        public router: ActivatedRoute,
        public route: Router,
        public eventDialogService: EventDialogService
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
        this.eventDialogService.showDialog(event);
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
