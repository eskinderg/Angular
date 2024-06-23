import { Component, Input } from '@angular/core';
import { Event } from '../../event';

@Component({
    selector: 'app-event-list-footer',
    templateUrl: './event-list-footer.component.html',
    styleUrls: ['./event-list-footer.component.scss']
})
export class EventListFooterComponent {
    @Input()
    events: Event[];

    constructor() {}
}
