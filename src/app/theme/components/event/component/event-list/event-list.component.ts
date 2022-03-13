import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../event';
import { Observable, of } from "rxjs";

@Component(
  {
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
  }
)
export class EventListComponent {

  @Input() events: Observable<Event[]>;

  @Output() remove: EventEmitter<Event> = new EventEmitter();
  @Output() toggle: EventEmitter<Event> = new EventEmitter();
  @Output() update: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  onToggleEvent(event: Event) {
    this.toggle.emit( event );
  }

  onUpdateEvent(event: Event) {
    this.update.emit(event);
  }

  onRemoveEvent(event: Event) {
    this.remove.emit(event);
  }

}
