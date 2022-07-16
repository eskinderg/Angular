import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
// import { AuthService } from '../services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import * as fromEvents from '../../../reducers/events.reducer';
import { count, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  eventsCount$: Observable<number>;

  // name: any;
  // claims: any
  // public ItemsCount;

  constructor(
    private oauthService: OAuthService,
    private store: Store<fromEvents.EventsState>
  ) { }

  ngOnInit() {
    this.eventsCount$ = this.store.select(fromEvents.getEventsLength);
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

  onSignout() {
    // this.service.logout();
  }

  get IsLoggedIn() {
    return this.oauthService.hasValidAccessToken();

  }

  // get EventItemCount() {
  //   // return this.store.select(fromEvents.initialState.events.length)
  //   return 1;
  // }

}
