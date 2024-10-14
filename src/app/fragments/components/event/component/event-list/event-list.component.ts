import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../event';
import { FadeInOutEventListItem } from 'src/app/components/shared/animations/fadeInAndOutEventListItem';
import { EventListItemComponent } from './event-list-item/event-list-item.component';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
    animations: [FadeInOutEventListItem],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [EventListItemComponent]
})
export class EventListComponent {
    @Input() events: Event[];

    @Output() remove: EventEmitter<Event> = new EventEmitter();
    @Output() toggle: EventEmitter<Event> = new EventEmitter();
    @Output() update: EventEmitter<Event> = new EventEmitter();
    @Output() select: EventEmitter<any> = new EventEmitter();

    constructor() {}

    onToggleEvent(event: Event) {
        this.toggle.emit(event);
    }

    onUpdateEvent(event: Event) {
        this.update.emit(event);
    }

    onRemoveEvent(event: Event) {
        this.remove.emit(event);
    }

    onSelectEvent(item: { selected: boolean; event: Event }) {
        this.select.emit(item);
    }
}
