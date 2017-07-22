import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '../../event';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  moduleId: module.id,
  selector: 'app-event-list-header',
  templateUrl: './event-list-header.component.html',
  styleUrls: ['./event-list-header.component.scss']
})
export class EventListHeaderComponent {

  newEvent: Event = new Event();

  @Output()
  add: EventEmitter<Event> = new EventEmitter();

  constructor() {
  }

  addEvent() {
    this.add.emit(this.newEvent);
    this.newEvent = new Event();
  }

}
