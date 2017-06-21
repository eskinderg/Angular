import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';
import { CanActivate, Router } from '@angular/router';

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
  constructor( private authService: AuthService, private router: Router) { }
/**
* Invoked during class initialization and redirects the user
*/
  ngOnInit() {
    Observable.fromPromise(this.authService.mgr.signinRedirectCallback())
              .subscribe((user) => {
                  this.authService.userLoadededEvent.emit(user); //Notifying User has loggedIn Successfully
                  this.router.navigate(['/']);
              },(error)=>{
                  console.log(error);
                  this.router.navigate(['/404']);
              });
  }

}
