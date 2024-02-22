import { Component, ChangeDetectionStrategy } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../store/reducers/events.reducer';

@Component({
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  constructor(private store: Store<fromEvents.IEventsState>) {}

  get EventItems() {
    return this.store.select(fromEvents.getEvents);
  }
}
