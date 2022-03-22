import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { LoggingService } from './error/loggingservice';
import { NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import * as AuthActions from '../app/actions/auth';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app/reducers';
import { OAuthService } from 'angular-oauth2-oidc';
import { NullValidationHandler, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

import { ToastService } from './shared/toast/toast.service';
/**
 * This class represents the main application component.
 */
@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('spinnerElement', {static:true}) spinnerElement: ElementRef;
  errorOccured = false;
  errorMessage ='';
  errorStatusText ='';

  constructor(
    private errorLog: LoggingService,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private oauthService: OAuthService,
    private store: Store<fromRoot.State>,
    private toastService: ToastService
  ) {

    this.oauthService.events.subscribe(e => {
      // if (e.type === 'token_expires') {
        // console.log(e);
        // this.store.dispatch(new AuthActions.TokenExpire('Your session has expired. Please login again.'));
      // }
    });

    errorLog.onError.subscribe((error) => {
      this.toastService.showDanger(error['message'])
    });

    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });
    this.configureWithNewConfigApi();

    // for debugging purposes
    if (!environment.production) {
      // console.log('Environment config', environment);
    }
  }

  ngOnInit() { }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private _navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setStyle(
          this.spinnerElement.nativeElement,
          'opacity',
          '1'
        );
      });
    }

    if (event instanceof NavigationEnd) {
      this._hideSpinner();
    }

    if (event instanceof NavigationCancel) {
      this._hideSpinner();
    }
    if (event instanceof NavigationError) {
      this._hideSpinner();
    }
  }

  private _hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setStyle(
        this.spinnerElement.nativeElement,
        'opacity',
        '0'
      );
    });
  }

}
