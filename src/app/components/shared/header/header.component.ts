import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { AuthService } from '../services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
/**
 * This class represents the Header Component.
 */
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Output() signout: EventEmitter<any> = new EventEmitter();
  public isExpanded = false;
  _user: any;
  // name: any;
  // claims: any
  constructor (private oauthService: OAuthService) {

  }

  ngOnInit() {
     // this.claims = this.oauthService.getIdentityClaims();

    // if(this.claims){
     //  this.name = this.claims.name;
    // }
    // this.oauthService.loadUserProfile().then(profile => {

    //   this._user = profile;
    //   // console.log(this._user);
    // })
    // this.service.mgr.events.addUserLoaded(function (loadedUser) {
    //   this._user = loadedUser;
    // });
  }

  onSignout() {
    // this.service.logout();
  }

}
