import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '../../event';
import { HostListener, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListItemComponent {

  @Input() event: Event;
  @Input() IsInEditMode :boolean = false;
  @Output() remove: EventEmitter<Event> = new EventEmitter();
  @Output() toggleComplete: EventEmitter<Event> = new EventEmitter();
  @Output() update: EventEmitter<Event> = new EventEmitter();
  @Output() toggleEdit: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  onComplete() {
    this.toggleComplete.emit({
      ...this.event, complete: !this.event.complete
    });
  }

  editEvent(event: Event) {
    if(this.IsInEditMode){
      this.update.emit(event);
    }
    this.IsInEditMode =! this.IsInEditMode;
  }

  removeEvent(event: Event) {
    this.remove.emit(event);
  }

}
