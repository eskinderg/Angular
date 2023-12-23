import { NgModule, Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Event } from '../../event';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-list-header',
  templateUrl: './event-list-header.component.html',
  styleUrls: ['./event-list-header.component.scss']
})
export class EventListHeaderComponent {

  newEvent: Event = new Event();

  @Output()
  add: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  addEvent() {
    if (this.newEvent.title.length > 0) {
      this.add.emit(this.newEvent);
      this.newEvent = new Event();    // clear entry
    }
  }
}
