import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../actions/auth';
import * as fromRoot from '../../reducers';
/**
 * Class representing authorization endpoint for the client
 */
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  /**
   * @param {AuthService} authService - Authorization service used of authService
   * @param {Router} router - Injected router for user redirection based on user login status
   */
  constructor( private authService: AuthService, private router: Router,private store: Store<fromRoot.State>) { }
  /**
   * Invoked during class initialization and redirects the user
   */
  ngOnInit() {
    Observable.fromPromise(this.authService.mgr.signinRedirectCallback())
      .subscribe((user) => {
        this.authService.userLoadededEvent.emit(user); // Notifying User has loggedIn Successfully
        this.store.dispatch(new AuthActions.loginEventSuccess(user));
        this.router.navigate(['/']);
      }, (error) => {
        console.log(error);
        this.router.navigate(['/404']);
      });
  }

}
