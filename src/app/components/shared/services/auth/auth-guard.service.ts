import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';
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
  constructor(private authService: AuthService, private router: Router) { }
  /**
   *  Checks if the user is loggedin.
   */
  canActivate() {
    this.authService
      .isLoggedInObs()
      .subscribe((loggedin) => {
        if (!loggedin) {
          this.router.navigate(['unauthorized']);
        }
      });

      return this.authService.isLoggedInObs();
  }

}
