import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Event } from '../../event';
import { v4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-event-list-header',
    templateUrl: './event-list-header.component.html',
    styleUrls: ['./event-list-header.component.scss'],
    imports: [FormsModule]
})
export class EventListHeaderComponent {
    newEvent: Event = new Event();

    @Output()
    add: EventEmitter<Event> = new EventEmitter();

    constructor() {}

    addEvent() {
        if (this.newEvent.title.length > 0) {
            this.add.emit({ ...this.newEvent, id: v4() });
            this.newEvent = new Event(); // clear entry
        }
    }
}
