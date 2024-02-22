import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth/auth.service';
import * as fromRoot from '../../store/reducers';
import * as AuthActions from '../../store/actions/auth.action';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
  constructor(
    private location: Location,
    private service: AuthService,
    private store: Store<fromRoot.IAppState>
  ) {}

  login() {
    // this.store.dispatch(new AuthActions.loginEvent());
  }

  goback() {
    this.location.back();
  }

  startSignoutMainWindow() {
    // this.service.startSignoutMainWindow();
    this.service.logout();
  }
}
