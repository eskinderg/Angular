import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../store/reducers/events.reducer';
import { CardComponent } from '../../fragments/components/card/card.component';
import { EventComponent } from '../../fragments/components/event/component/event.component';
import { AsyncPipe } from '@angular/common';
import { EventsResolve } from 'src/app/fragments/components/event/event.data.service/EventsResolve';

@Component({
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss'],
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent, EventComponent, AsyncPipe],
    providers: [EventsResolve]
})
export class EventsComponent {
    private store = inject<Store<fromEvents.IEventsState>>(Store);

    get EventItems() {
        return this.store.select(fromEvents.getEvents);
    }
}
