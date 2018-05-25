import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth/auth.service';

import * as fromRoot from '../../reducers';

import * as AuthActions from '../../actions/auth';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private location: Location, private service: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  login() {
    // try {
    this.store.dispatch(new AuthActions.loginEvent());
    // this.service.mgr.signinPopup();
    // this.service.startSigninMainWindow();
    // this.service.mgr.signinRedirect();
    // } catch (err) {
    // console.log(err);
    // }
    }

  goback() {
    this.location.back();
  }

  startSignoutMainWindow() {
    this.service.startSignoutMainWindow();
  }

}
