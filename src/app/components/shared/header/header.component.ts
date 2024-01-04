import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
// import { AuthService } from '../services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../../reducers/events.reducer';
import * as fromNotes from '../../../reducers/notes.reducer';
import { count, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import * as fromProfile from '../../../reducers/preference.reducer';

/**
 * This class represents the Header Component.
 */
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Output() signout: EventEmitter<any> = new EventEmitter();
  public isExpanded = false;
  _user: any;

  // name: any;
  // claims: any
  // public ItemsCount;

  constructor(
    private oauthService: OAuthService,
    private eventStore: Store<fromEvents.EventsState>,
    private noteStore: Store<fromNotes.NotesState>
  ) { }

  ngOnInit() {
    // this.claims = this.oauthService.getIdentityClaims();

    // if(this.claims){
    //  this.name = this.claims.name;
    // }
    // this.oauthService.loadUserProfile().then(profile => {

    //   this._user = profile;
    //   // console.log(this._user);
    // })
    // this.service.mgr.events.addUserLoaded(function (loadedUser) {
    //   this._user = loadedUser;
    // });
  }

  get EventsCount() {
    return this.eventStore.select(fromEvents.getEventsLength)
  }

  get NotesCount() {
    return this.noteStore.select(fromNotes.getNotesLength)
  }

  onSignout() {
    // this.service.logout();
  }

  get IsLoggedIn() {
    return this.eventStore.select(fromProfile.isLoggedIn)
    // return this.oauthService.hasValidAccessToken();

  }

  // get EventItemCount() {
  //   // return this.store.select(fromEvents.initialState.events.length)
  //   return 1;
  // }

}
