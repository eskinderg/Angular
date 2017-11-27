import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../event';

@Component(
  {
    moduleId: module.id,
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
  }
)
export class EventListComponent {

  @Input() events: Event[];

  @Output() remove: EventEmitter<Event> = new EventEmitter();
  @Output() toggleComplete: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  onToggleEventComplete(event: Event) {
    this.toggleComplete.emit( event );
  }

  onRemoveEvent(event: Event) {
    this.remove.emit(event);
  }

}
