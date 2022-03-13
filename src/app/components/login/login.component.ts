import { Store } from '@ngrx/store';
import { Component, OnInit, HostBinding} from '@angular/core';
import { Location } from '@angular/common';
import { Router , ActivatedRoute} from '@angular/router';
import * as fromRoot from '../../reducers';
import * as AuthActions from '../../actions/auth';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../auth.config';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  userName = '';
  password = '';
  loginFailed = false;
  userProfile: object | undefined;
  loginForm: FormGroup | undefined;
  message: string | undefined;

  constructor(
    private store: Store<fromRoot.State>,
    private oauthService: OAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.params
      .subscribe(
        params => this.message = params['endsession']
      );
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    })
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

    this.oauthService.initLoginFlow();

    // this.store.dispatch(
    //   new AuthActions.LoginEvent(
    //     this.userName,
    //     this.password
    //   )
    // );

  }

  logout() {
    this.oauthService.logOut(true);
  }}
