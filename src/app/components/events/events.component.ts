import { Component, OnInit } from '@angular/core';
// import { SlideAnimation } from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../reducers/events';

@Component({
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.scss'],
  animations: [fadeInAnimation]
})
export class EventsComponent {

  public events$: any;

  constructor(private store: Store<fromEvents.State>) { }

  ngOnInit() { }

  get EventItems() {
    return this.store.select(fromEvents.getEvents);
  }

}
