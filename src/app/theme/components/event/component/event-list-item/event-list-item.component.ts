import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '../../event';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListItemComponent {

  @Input() event: Event;
  @Input() IsInEditMode = false;

  @Output() remove: EventEmitter<Event> = new EventEmitter();
  @Output() toggle: EventEmitter<Event> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  editEvent: Event = new Event();

  constructor() { }

  onToggleEvent(event: Event) {
    this.toggle.emit(event);
  }

  onUpdateEvent(event: Event) {

    if (this.IsInEditMode) {
      this.update.emit({oldValue: event, newValue: this.editEvent});
    }

    this.IsInEditMode = !this.IsInEditMode;
    this.editEvent = new Event(event);
  }

  removeEvent(event: Event) {
    this.remove.emit(event);
  }
}
