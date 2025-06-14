import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, EventEmitter, inject } from '@angular/core';
// import { UserManager, User} from 'oidc-client';
// import { Headers, RequestOptions, Response } from '@angular/http';
import { of, Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

// import { environment } from './../../environments/environment';

// const settings: any = environment.Auth;

@Injectable()
export class AuthService {
    private oauthService = inject(OAuthService);
    private http = inject(HttpClient);
    private route = inject(Router);

    // mgr: UserManager = new UserManager(settings);
    userLoadededEvent: EventEmitter<any> = new EventEmitter<any>();
    currentUser: any;
    loggedIn = false;

    isLoggedInObs(): Observable<boolean> {
        return of(this.oauthService.hasValidAccessToken());
    }

    isLoggedIn(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    clearState() {
        // this.mgr.clearStaleState().then(function () {
        //   console.log('clearStateState success');
        // }).catch(function (e) {
        //   console.log('clearStateState error', e.message);
        // });
    }

    getUser() {
        this.oauthService
            .loadUserProfile()
            .then((profile) => {
                this.currentUser = profile;
                console.log('got user', profile);
                this.userLoadededEvent.emit(profile);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    getProfile() {
        return this.oauthService.getIdentityClaims();
    }

    removeUser() {
        // this.mgr.removeUser().then(() => {
        //   this.userLoadededEvent.emit(null);
        //   console.log('user removed');
        // }).catch(function (err: any) {
        //   console.log(err);
        // });
    }

    startSigninMainWindow() {
        // this.mgr.signinSilent({ data:'asdf'}).then(function(){
        //   console.log('horayyyyy');
        // }).catch(function(err){
        //   console.log(err);
        // });
        // this.mgr.signinRedirect({ data: 'some data' }).then(function () {
        //   console.log('signinRedirect done');
        // }).catch(function (err: any) {
        //   console.log(err);
        //   return err;
        // });
    }

    endSigninMainWindow() {
        // this.mgr.signinRedirectCallback().then(function (user) {
        //   console.log('signed in', user);
        // }).catch(function (err: any) {
        //   console.log(err);
        // });
    }

    startSignoutMainWindow() {
        // this.mgr.getUser().then(user => {
        //   return this.mgr.signoutRedirect({ id_token_hint: user.id_token }).then(resp => {
        //     console.log('signed out', resp);
        //     setTimeout(() => {
        //       console.log('testing to see if fired...');
        //     }, 5000);
        //   }).catch(function (err) {
        //     console.log(err);
        //   });
        // });
    }

    logout() {
        this.oauthService.logOut();
        // this.mgr.getUser().then(user => {
        //   return this.mgr.signoutRedirect({ id_token_hint: user.id_token });
        // });
    }

    endSignoutMainWindow() {
        // this.mgr.signoutRedirectCallback().then(function (resp) {
        //   console.log('signed out', resp);
        // }).catch(function (err) {
        //   console.log(err);
        // });
    }
}
