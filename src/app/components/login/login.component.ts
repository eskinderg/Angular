import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, Router } from '@angular/router';
import * as fromRoot from '../../reducers';
import * as AuthActions from '../../actions/auth';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../auth.config';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  loginFailed: boolean = false;
  userProfile: object;
  loginForm: FormGroup;

  constructor(
    private store: Store<fromRoot.State>,
    private oauthService: OAuthService,
    private router: Router,
    private formBuilder : FormBuilder
  ){ }

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

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get familyName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  loginWithPassword() {
    this.store.dispatch(
      new AuthActions.loginEvent(
        this.userName,
        this.password
      )
    );

    // this.oauthService
    //   .fetchTokenUsingPasswordFlowAndLoadUserProfile(
    //     this.userName,
    //     this.password
    //   )
    //   .then(() => {
    //     console.debug('successfully logged in');
    //     this.loginFailed = false;
    //     this.router.navigate(['/']);
    //   })
    //   .catch(err => {
    //     console.error('error logging in', err);
    //     this.loginFailed = true;
    //   });
  }

  logout() {
    this.oauthService.logOut(true);
  }}
