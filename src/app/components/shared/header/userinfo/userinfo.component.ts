import { Component, EventEmitter, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { UntypedFormControl } from '@angular/forms';
import { ThemeService } from 'src/app/shared/theme.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {

  claims: any;
  name: any;
  public theme: any = new UntypedFormControl();

  @Output() signout: EventEmitter<any> = new EventEmitter();

  constructor(
    private themeService: ThemeService,
    private oauthService: OAuthService,
  ) {

    this.theme.value = this.themeService.current;
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
    this.themeService.current = theme;
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
