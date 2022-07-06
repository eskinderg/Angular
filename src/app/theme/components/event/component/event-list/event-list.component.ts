import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../event';
import { Observable } from "rxjs";
import { FadeInOutEventListItem } from 'src/app/components/shared/animations/fadeInAndOutEventListItem';

@Component(
  {
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
    animations: [ FadeInOutEventListItem ],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)
export class EventListComponent {

  @Input() events: Event[];

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
