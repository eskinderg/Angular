import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EventDataService } from '../event.data.service/event.data.service';
import { Event } from '../event';
import { ConfirmService } from '../../../../theme/components/modal/confirm.service';


@Component({
  selector: 'event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss'],
  providers: [EventDataService]
})
export class EventComponent {

  @Input() events: Event[] = [];

  constructor(private eventDataService: EventDataService, private confirmService: ConfirmService) {
  }

  onAddEvent(event: Event) {
    this.eventDataService
      .addEvent(event)
      .subscribe(
        (newEvent) => {
          this.events = this.events.concat(newEvent);
        }
      );
  }

  onToggleEventComplete(event: Event) {
    this.eventDataService
      .toggleEventComplete(event)
      .subscribe(
        (updatedEvent) => {
          event = updatedEvent;
        }
      );
  }

  onRemoveEvent(event: Event) {
    this.confirmService.confirm({
      title: 'Confirm deletion',
      message: 'Do you really want to delete the item ' + '"' + event.title + '"?'
    }
    ).then(
      () => {
        this.eventDataService
          .deleteEventById(event.id)
          .subscribe(
          (_) => {
            this.events = this.events.filter((t) => t.id !== event.id);
          }
          );
      },
      () => {
        console.log('not deleting...');
      });

  }

}
