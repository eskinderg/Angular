import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Event } from '../../../../models/event';
import { ConfirmService } from '../../../../theme/components/modal/confirm.service';
import * as EventsActions from '../../../../actions/event.action';
import * as fromRoot from '../../../../reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})
export class EventComponent {

  @Input() events: Event[];

  constructor(private confirmService: ConfirmService,
    private store: Store<fromRoot.AppState>) { }

  onAddEvent(event: Event) {
    this.store.dispatch(EventsActions.createEvent({ payload: event }));
  }

  onToggleEvent(event: Event) {
    this.store.dispatch(EventsActions.toggleEvent({ payload: event }));
  }

  onUpdateEvent(event: Event) {
    this.store.dispatch(EventsActions.updateEvent({ payload: event }));
  }

  onRemoveEvent(event: Event) {
    this.confirmService.confirm({
      title: 'Confirm deletion',
      message: 'Do you really want to delete the item ' + '"' + event.title + '"?',
      backdrop: true,
    }).then(() => {
      this.store.dispatch(EventsActions.deleteEvent({ payload: event }));
    }, () => {
      console.log();
    });
  }

}
