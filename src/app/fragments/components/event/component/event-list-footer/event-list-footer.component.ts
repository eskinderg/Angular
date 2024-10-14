import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '../../event';

@Component({
    selector: 'app-event-list-footer',
    templateUrl: './event-list-footer.component.html',
    styleUrls: ['./event-list-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class EventListFooterComponent {
    @Input()
    events: Event[];

    constructor() {}
}
