import { Component, Input } from '@angular/core';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-list-select',
  templateUrl: './event-list-select.component.html',
  styleUrl: './event-list-select.component.scss'
})
export class EventListSelectComponent {
  @Input() event: Event
}
