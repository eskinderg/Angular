import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
/**
 * This class represents the HeaderComponent.
 */
@Component({
  selector: 'wz-toolbar',
  templateUrl: 'wztoolbar.component.html',
  styleUrls: ['wztoolbar.component.scss'],
})
export class WzToolbarComponent implements OnInit {

  public isExpanded = false;
  _user:any;
  activeRoute:string;

  constructor (private router:Router){
      this.activeRoute = this.router.url;
      console.log(this.router.routerState);
  }

  ngOnInit(){
    // this.service.userLoadededEvent
    //   .subscribe(user => {
    //     this._user = user;
    // });
  }

  isUserLoggedIn(){
    return false
    // let isLoggedIn = this.service.isLoggedInObs();
    // return isLoggedIn;
  }

}
