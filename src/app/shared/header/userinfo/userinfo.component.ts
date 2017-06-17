
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
})
export class UserInfoComponent {

  // public isExpanded = false;
  @Input()
  user:any;

  constructor(private service: AuthService) { }

  startSignoutMainWindow() {
    this.service.startSignoutMainWindow();
  }

  isUserLoggedIn(){
    return false
    // let isLoggedIn = this.service.isLoggedInObs();
    // return isLoggedIn;
  }

}
