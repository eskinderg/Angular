import { Component } from '@angular/core';
// import { UserManager} from 'oidc-client';
// import * as Oidc from 'oidc-client/lib/oidc-client.js';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class NotfoundComponent {
  // userMgr: Oidc = new Oidc.UserManager();

  constructor(private authService: AuthService) {
    // this.service.mgr.signoutRedirectCallback()
    // if(this.authService.loggedIn)
    // {
    // this.userMgr
    // .signinRedirectCallback()
    // .then((user)=>{
    //    console.log(user);
    //    location.href ='/'
    // }).catch(function(err){
    //       console.log(err);
    // });
    // }
  }

  // ngOnInit() {}
}
