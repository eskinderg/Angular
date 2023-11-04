import { Component } from '@angular/core';
import { LoggingService } from './error/loggingservice';
import { NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { ToastService } from './shared/toast/toast.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild('spinnerElement', { static: true }) spinnerElement: ElementRef;

  constructor(
    private errorLog     : LoggingService,
    private router       : Router,
    private ngZone       : NgZone,
    private renderer     : Renderer2,
    private toastService : ToastService,
  ) {

    this.errorLog.onError.subscribe((error) => {
      this.toastService.showDanger(error['message'], "Error")
    });

    this.router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
        this._navigationInterceptor(e);
      });

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
