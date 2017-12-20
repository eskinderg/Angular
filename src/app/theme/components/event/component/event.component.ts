import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Event } from '../../../../models/event';
import { ConfirmService } from '../../../../theme/components/modal/confirm.service';
import * as EventsActions from '../../../../actions/event';

import * as fromRoot from '../../../../reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})
export class EventComponent {

  @Input() events: Event[];

  constructor( private confirmService: ConfirmService,
    private store: Store<fromRoot.State> ) { }

    onAddEvent(event: Event) {
      this.store.dispatch(new EventsActions.createEvent(event));
    }

    onToggleEventComplete(event) {
      this.store.dispatch(new EventsActions.updateEvent(event));
    }

    onRemoveEvent(event: Event) {
      this.confirmService.confirm({
        title: 'Confirm deletion',
        message: 'Do you really want to delete the item ' + '"' + event.title + '"?' })
          .then(() => {
            this.store.dispatch(new EventsActions.deleteEvent(event));
          }, () => {
            console.log();
          });
    }

}
