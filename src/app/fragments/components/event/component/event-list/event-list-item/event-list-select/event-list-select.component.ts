import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from 'src/app/fragments/components/event/event';

@Component({
    selector: 'app-event-list-select',
    templateUrl: './event-list-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class EventListSelectComponent {
    @Input() event: Event;
}
