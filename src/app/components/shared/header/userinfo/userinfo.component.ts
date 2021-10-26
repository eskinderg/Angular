import { Component, EventEmitter, Output , OnInit} from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../../reducers/auth';
import * as  AuthActions from '../../../../actions/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
})
export class UserInfoComponent {

  claims: any;
  name: any;

  @Output() signout: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private store: Store<fromAuth.State>,
    private oauthService: OAuthService,
    private authService: AuthService
  ) { }

  login() {
    // this.router.navigate(['login']);
    this.oauthService.initLoginFlow();
  }

  logOut() {
    this.oauthService.logOut();
    // this.store.dispatch(new AuthActions.Logout());
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

}
