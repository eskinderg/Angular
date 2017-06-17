import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'sd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public isExpanded = false;
  _user:any;
  loadedUserSub: any;


  constructor (private service: AuthService){

  }

  ngOnInit(){
    this.loadedUserSub = this.service.userLoadededEvent
      .subscribe(user => {
        this._user = user;
      });
  }

  isUserLoggedIn(){
    return false
    // let isLoggedIn = this.service.isLoggedInObs();
    // return isLoggedIn;
  }

}
