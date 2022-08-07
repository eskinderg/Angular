import { Component, EventEmitter, Output, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromProfile from '../../../../reducers/profile.reducer';
import * as ProfileActions from '../../../../actions/profile.action';

@Component({
  selector: 'app-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnDestroy {

  claims: any;
  name: any;
  public theme: any = new UntypedFormControl();
  themeSubscription: Subscription;

  @Output() signout: EventEmitter<any> = new EventEmitter();

  constructor(
    private oauthService: OAuthService,
    private store: Store<fromProfile.ProfileState>
  ) {

    this.themeSubscription = this.store.select(fromProfile.getTheme).subscribe((theme) => {
      this.theme.value = theme;
    })
  }

  login() {
    // this.router.navigate(['login']);
    this.oauthService.initLoginFlow();
  }

  logOut() {
    this.oauthService.logOut();
    // this.store.dispatch(new AuthActions.Logout());
  }

  public onThemeChange(theme: any) {
    // this.themeService.current = theme;
    this.store.dispatch(ProfileActions.setTheme({ theme: theme }))
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['given_name'];
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
