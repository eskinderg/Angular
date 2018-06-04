import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router , ActivatedRoute} from '@angular/router';
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

  userName: string = "Kukusha";
  password: string = "123001";
  loginFailed: boolean = false;
  userProfile: object;
  loginForm: FormGroup;
  message: string;

  constructor(
    private store: Store<fromRoot.State>,
    private oauthService: OAuthService,
    private router: Router,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute
  ){
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

  hasMessage() :boolean {
    return (this.message !== undefined && this.message !== 'undefined');
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
