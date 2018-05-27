import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
})
export class UserInfoComponent {

  constructor( private authService: AuthService ) { }

  isLoggedIn() {
    return this.authService.loggedIn;
  }

  startSignoutMainWindow() {
    this.authService.startSignoutMainWindow();
  }

}
