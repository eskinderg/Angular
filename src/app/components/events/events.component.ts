import { Component, HostListener, HostBinding, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlideAnimation } from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Observable } from 'rxjs';
import { ConfirmService } from '../../theme/components/modal/confirm.service';
import { AuthService } from '../../shared/auth.service';
import { User } from 'oidc-client';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../reducers/events';
/**
 * This class represents the lazy loaded ProfileComponent.
 */
@Component({
  selector: 'app-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.scss'],
  animations: [ fadeInAnimation ]
})
export class EventsComponent implements OnInit {

  public events$;

  constructor(private authService: AuthService, private store: Store<fromEvents.State>) {
    this.store.dispatch({ type: 'FETCH_EVENTS' });
  }

  ngOnInit() { }

  get EventItems () {
    return this.store.select(fromEvents.getEvents);
  }

}
