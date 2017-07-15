import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../event';

@Component({
  moduleId: module.id,
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent {

  @Input() event: Event;

  @Output()
  remove: EventEmitter<Event> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Event> = new EventEmitter();

  constructor() {
  }

  toggleEventComplete(event: Event) {
    this.toggleComplete.emit(event);
  }

  removeEvent(event: Event) {
    this.remove.emit(event);
  }

}
