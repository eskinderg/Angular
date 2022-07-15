import { Component, ChangeDetectionStrategy} from '@angular/core';
// import { SlideAnimation } from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../reducers/events.reducer';

@Component({
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@routerFadeInAnimation]': '' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {

  constructor(private store: Store<fromEvents.EventsState>) { }

  ngOnInit() { }

  get EventItems() {
    return this.store.select(fromEvents.getEvents);
  }

}
