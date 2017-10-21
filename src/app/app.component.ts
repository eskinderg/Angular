import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { LoggingService } from './error/loggingservice';
import { NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'ng-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild('spinnerElement') spinnerElement: ElementRef;
  errorOccured = false;

  constructor(
    private errorLog: LoggingService,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer
  ) {

    errorLog.onError.subscribe((error) => {
      this.errorOccured = true;
    });

    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });

    // for debugging purposes
    console.log('Environment config', environment);
  }

  private _navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setElementStyle(
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
      this.renderer.setElementStyle(
        this.spinnerElement.nativeElement,
        'opacity',
        '0'
      );
    });
  }

}
