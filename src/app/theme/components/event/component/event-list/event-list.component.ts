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

  @Input()
  events: Event[];

  @Output()
  remove: EventEmitter<Event> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  onToggleEventComplete(event: Event, changes: any) {
    this.toggleComplete.emit( { event: event, updates: changes } );
  }

  onRemoveEvent(event: Event) {
    this.remove.emit(event);
  }

}
