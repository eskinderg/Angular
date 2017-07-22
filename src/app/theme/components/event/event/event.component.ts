import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { EventDataService } from '../event.data.service/event.data.service';
import { Event } from '../event';
import { ConfirmService } from '../../../../theme/components/modal/confirm.service';
import { AppStore } from '../../../../app-store.model';
import { EventsActions } from '../../../../common/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})
export class EventComponent {

  @Input() events: Event[];

  constructor(private confirmService: ConfirmService,
              private store: Store<any>,
              private eventsActions: EventsActions) { }

  onAddEvent(event: Event) {
    this.store.dispatch(this.eventsActions.createEvent(event));
  }

  onToggleEventComplete(event: Event) {
    event.complete = !event.complete;
    this.store.dispatch(this.eventsActions.updateEvent(event.id, event));
  }

  onRemoveEvent(event: Event) {
    this.confirmService.confirm({
      title: 'Confirm deletion',
      message: 'Do you really want to delete the item ' + '"' + event.title + '"?'
    }).then(
      () => {
        this.store.dispatch(this.eventsActions.deleteEvent(event.id));
      }, () => {
        console.log();
      });
  }

}
