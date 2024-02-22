import { Component, EventEmitter, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';

import * as fromProfile from '../../../../store/reducers/preference.reducer';
import * as ProfileActions from '../../../../store/actions/preference.action';

@Component({
  selector: 'app-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  claims: any;
  name: any;
  isDarkMode: Observable<boolean>;

  @Output() signout: EventEmitter<any> = new EventEmitter();

  constructor(
    private oauthService: OAuthService,
    public store: Store<fromProfile.IPreferenceState>
  ) {
    this.isDarkMode = this.store.select(fromProfile.isDarkMode);
  }

  login() {
    // this.router.navigate(['login']);
    this.oauthService.initLoginFlow();
  }

  logOut() {
    this.oauthService.logOut();
    // this.store.dispatch(new AuthActions.Logout());
  }

  get isLoggedIn() {
    return this.store.select(fromProfile.isLoggedIn);
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['given_name'];
  }

  onDarkModeToggle() {
    this.store.dispatch(ProfileActions.toggleDarkMode());
  }
}
