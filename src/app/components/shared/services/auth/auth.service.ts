import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { UserManager, User} from 'oidc-client';
// import { Headers, RequestOptions } from '@angular/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

const settings: any = environment.Auth;

@Injectable()
export class AuthService {

  mgr: UserManager = new UserManager(settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;
  authHeaders: Headers;

  constructor(private http: HttpClient , private route: Router) {

    this.mgr.getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.userLoadededEvent.emit(user);
        } else {
          this.loggedIn = false;
        }
      }).catch((err) => {
        console.error(err);
        this.loggedIn = false;
      });

    this.mgr.events.addUserLoaded((user) => {
      this.currentUser = user;
      localStorage.setItem('token', user.id_token);
      localStorage.setItem('access_token', user.access_token);
      this.loggedIn = !(user === undefined);
      if (!environment.production) {
        console.log('authService addUserLoaded', user);
      }

    });

    this.mgr.events.addUserUnloaded((e) => {

      localStorage.removeItem('token');
      localStorage.removeItem('access_token');

      if (!environment.production) {
        console.log('user unloaded');
      }
      // this.userLoadededEvent.emit(null);
      this.route.navigate(['/']);
      this.loggedIn = false;
    });

  }

  isLoggedInObs(): Observable<boolean> {
    return from(this.mgr.getUser())
    .pipe(
      map<User, boolean>((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

  clearState() {
    this.mgr.clearStaleState().then(function () {
      console.log('clearStateState success');
    }).catch(function (e) {
      console.log('clearStateState error', e.message);
    });
  }

  getUser() {
    this.mgr.getUser().then((user) => {
      this.currentUser = user;
      console.log('got user', user);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.userLoadededEvent.emit(null);
      console.log('user removed');
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSigninMainWindow() {
    // this.mgr.signinSilent({ data:'asdf'}).then(function(){
    //   console.log('horayyyyy');
    // }).catch(function(err){
    //   console.log(err);
    // });
    this.mgr.signinRedirect({ data: 'some data' }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
      return err;
    });
  }
  endSigninMainWindow() {
    this.mgr.signinRedirectCallback().then(function (user) {
      console.log('signed in', user);

    }).catch(function (err) {
      console.log(err);
    });
  }

  startSignoutMainWindow() {
    this.mgr.getUser().then(user => {
      return this.mgr.signoutRedirect({ id_token_hint: user.id_token }).then(resp => {
        console.log('signed out', resp);
        setTimeout(() => {
          console.log('testing to see if fired...');
        }, 5000);
      }).catch(function (err) {
        console.log(err);
      });
    });
  };

  logout() {
    this.mgr.getUser().then(user => {
      return this.mgr.signoutRedirect({ id_token_hint: user.id_token });
    });
  };

  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err);
    });
  };
  /**
   * Example of how you can make auth request using angulars http methods.
   * @param options if options are not supplied the default content type is application/json
   */
  // AuthGet(url: string, options?: RequestOptions): Observable<Response> {

  // if (options) {
  // options = this._setRequestOptions(options);
  // } else {
  // options = this._setRequestOptions();
  // }
  // return this.http.get(url, options);
  // }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  // AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

  // const body = JSON.stringify(data);

  // if (options) {
  // options = this._setRequestOptions(options);
  // } else {
  // options = this._setRequestOptions();
  // }
  // return this.http.put(url, body, options);
  // }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  // AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

  // if (options) {
  // options = this._setRequestOptions(options);
  // } else {
  // options = this._setRequestOptions();
  // }
  // return this.http.delete(url, options);
  // }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  // AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

  // const body = JSON.stringify(data);

  // if (options) {
  // options = this._setRequestOptions(options);
  // } else {
  // options = this._setRequestOptions();
  // }
  // return this.http.post(url, body, options);
  // }


  private _setAuthHeaders(user: any): void {
    this.authHeaders = new Headers();
    this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
    if (this.authHeaders.get('Content-Type')) {

    } else {
      this.authHeaders.append('Content-Type', 'application/json');
    }
  }

  // private _setRequestOptions(options?: RequestOptions) {
  //   if (this.loggedIn) {
  //     this._setAuthHeaders(this.currentUser);
  //   }
  //   if (options) {
  //     options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
  //   } else {
  //     options = new RequestOptions({ headers: this.authHeaders });
  //   }

  //   return options;
  // }

}
