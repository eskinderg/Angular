import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoggingService } from './error/loggingservice';
import { NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { OAuthEvent, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { NullValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { ToastService } from './shared/toast/toast.service';
import { Store, Action } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as EventsActions from './actions/event';
import * as NotesActions from './actions/note';

@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  @ViewChild('spinnerElement', { static: true }) spinnerElement: ElementRef;

  initialActions: Action[] = [
    new EventsActions.FetchEvents(),
    new NotesActions.FetchNotes()
  ];

  constructor(
    private errorLog: LoggingService,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private oauthService: OAuthService,
    private toastService: ToastService,
    private store: Store<fromRoot.State>
  ) {

    this.errorLog.onError.subscribe((error) => {
      this.toastService.showDanger(error['message'], "Error")
    });

    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });

    this.configureWithNewConfigApi();

    this.oauthService.events.subscribe(event => {
      this.loadUserInfo(event);
    });

  }

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

  private loadUserInfo(event: OAuthEvent) {
    if (event instanceof OAuthSuccessEvent) {
      if (event.type === "token_received" || event.type === "discovery_document_loaded")
        if (this.oauthService.hasValidIdToken()) {
          this.initialActions.forEach(action => this.store.dispatch(action))
        }
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
