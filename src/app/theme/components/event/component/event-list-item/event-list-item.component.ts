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

  // @ViewChild('editBox') editBox: ElementRef;

  // @HostListener('click', ['$event'])
  // click($event) {
  //   alert('clicked');
  // }
  @Input() event: Event;

  @Input() IsInEditMode :boolean = false;

  @Output()
  remove: EventEmitter<Event> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Event> = new EventEmitter();

  @Output()_
  toggleEdit: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  onComplete() {

    this.toggleComplete.emit({
      ...this.event, complete: !this.event.complete
    });

  }
  //invoke store here and update
  editEvent(event: Event) {
    this.IsInEditMode =! this.IsInEditMode;
  }
  removeEvent(event: Event) {
    this.remove.emit(event);
  }

}
