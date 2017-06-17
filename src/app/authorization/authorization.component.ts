import { Component, OnInit } from '@angular/core';
import { UserManager} from 'oidc-client/lib/oidc-client.min.js';
import { AuthService } from '../shared/services/auth/auth.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  userMgr: UserManager = new UserManager();

  constructor( private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

    // this.service.mgr.signoutRedirectCallback()
    // if(this.authService.loggedIn)
      // {
      this.userMgr
      .signinRedirectCallback()
      .then((user)=>{
         console.log(user);
         location.href ='/'
      }).catch(function(err){
            console.log(err);
            // console.log(this.router);
            // this.router.navigate(['/404']);
      });
    // }
  }

}
