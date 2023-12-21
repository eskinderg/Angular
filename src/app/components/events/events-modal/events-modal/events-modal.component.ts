import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Event } from 'src/app/theme/components/event/event';
import * as fromRoot from '../../../../reducers';
import * as EventsActions from '../../../../actions/event.action';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events-modal',
  templateUrl: './events-modal.component.html',
  styleUrl: './events-modal.component.scss'
})
export class EventsModalComponent {

  public Event: Event;

  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
    private store: Store<fromRoot.AppState>,
    private location: Location
  ) {
    if (this.router.getCurrentNavigation() == null) {
      this.activeModal.close()
      // this.location.go('./events');
      return;
    }

    console.log(this.router.getCurrentNavigation())
    if (this.router.getCurrentNavigation() != null) {
      this.Event = this.router.getCurrentNavigation().extras.state['event']
    }
    // this.location.go('./events')
    // console.log(this.Event)
  }

  no() {
    this.activeModal.close();
  }

  yes() {
    this.store.dispatch(EventsActions.deleteEvent({ payload: this.Event }));
    this.activeModal.close();
  }

}
