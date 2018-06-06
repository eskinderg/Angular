import { Component, EventEmitter, Output , OnInit} from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../../reducers/auth';
import * as  AuthActions from '../../../../actions/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
})
export class UserInfoComponent implements OnInit {

  claims:any;
  name: any;

  @Output() signout: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private store: Store<fromAuth.State>,
    private oauthService: OAuthService,
    private authService: AuthService
  ) {

    this.store.select(fromAuth.getProfile)
      .subscribe(p => {
        this.name = p['given_name'];
      })
  }

  login() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.store.dispatch(new AuthActions.logout());
  }

  ngOnInit() {
    if(this.isLoggedIn())
      this.name = this.oauthService.getIdentityClaims()['given_name'];
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
