import { Component, Input } from '@angular/core';
import { Event } from '../../../../fragments/components/event/event';

@Component({
  selector: 'app-table-event-list',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  events: Event[] | undefined;

  @Input()
  title: string | undefined;

  // @Output()
  // remove: EventEmitter<Event> = new EventEmitter();

  // @Output()
  // toggleComplete: EventEmitter<Event> = new EventEmitter();

  constructor() {}

  // onToggleEventComplete(event: Event) {
  //   this.toggleComplete.emit(event);
  // }
  //
  // onRemoveEvent(event: Event) {
  //   this.remove.emit(event);
  // }
}
