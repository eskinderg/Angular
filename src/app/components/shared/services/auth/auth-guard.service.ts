import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
/**
 * This class represents AuthGuardService.
 */
@Injectable()
export class AuthGuardService implements CanActivate {
  /**
   * Assign Router and authorization service.
   * @param {AuthService} authService - Authorization service the provied autorization
   * @param {Router} router - A Router used for routing
   */
  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) { }
  /**
   *  Checks if the user is loggedin.
   */
  canActivate() {

    if (this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      // this.router.navigate(['login']);
      this.oauthService.initLoginFlow();
      return false
    }

  }

}
