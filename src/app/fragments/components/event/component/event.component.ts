import { Component,Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event } from '../../../../models/event';
import { ConfirmService } from '../../../../fragments/components/dialog/confirm.service';
import * as EventsActions from '../../../../actions/event.action';
import * as fromRoot from '../../../../reducers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})
export class EventComponent {

  @Input() events: Event[];

  constructor(private confirmService: ConfirmService,
    private store: Store<fromRoot.AppState>,
    public router: ActivatedRoute,
    public route: Router,
  ) { }

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
    this.route.navigate(['/events','dialog', event.id], { state: { event: event}})
    // alert(this.route.url)
    // this.confirmService.confirm({
    //   title: 'Confirm deletion',
    //   message: 'Do you really want to delete the item ' + '"' + event.title + '"?',
    //   backdrop: true,
    //   centered: false
    // }).then(() => {
    //   this.store.dispatch(EventsActions.deleteEvent({ payload: event }));
    // }, () => {
    //   console.log();
    // });
  }

}
