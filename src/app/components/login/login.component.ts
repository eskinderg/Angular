import { Store } from '@ngrx/store';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../reducers';
import * as AuthActions from '../../actions/auth.action';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../auth.config';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  userProfile: object;
  loginForm: UntypedFormGroup;
  message: string;

  constructor(
    private store: Store<fromRoot.AppState>,
    private oauthService: OAuthService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.params
      .subscribe(
        params => this.message = params['endsession']
      );
  }

  ngOnInit() {

    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    })
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required ],
    //   password: ['', Validators.required ]
    // })
  }

  loadUserProfile(): void {
    this.oauthService.loadUserProfile()
      .then(
        up => (this.userProfile = up)
      );
  }

  hasMessage(): boolean {
    return (this.message !== undefined && this.message !== 'undefined');
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();

    if (!claims) {
      return null;
    }

    return null;
    // return claims['given_name'];
  }

  get familyName() {
    const claims = this.oauthService.getIdentityClaims();

    if (!claims) {
      return null;
    }

    return null;
    // return claims['family_name'];
  }

  loginWithPassword() {

    // this.oauthService.initLoginFlow();
    if (this.loginForm.valid) {
      this.store.dispatch(
        AuthActions.loginEvent(
          {
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value
          }
        )
      );
    }
  }

  logout() {
    this.oauthService.logOut(true);
  }
}
