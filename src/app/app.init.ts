import { APP_INITIALIZER, Provider, APP_BOOTSTRAP_LISTENER, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy, Router } from '@angular/router';
import { LoggingService } from './error/loggingservice';
import { ToastService } from './shared/toast/toast.service';
import { initializePreference } from './init/app.init.preference';
import { bootstrapAppRouteFactory } from './init/app.init.route';
import { initializeToast } from './init/app.init.toast';
import { GlobalErrorHandler } from './error/errorhandle';
import { HttpErrorInterceptor } from './error/http.error.interceptor';
import { AppRouteReuseStrategy } from './init/app.init.routeStrategy';
import { ThemeService } from './shared/theme.service';

export const APP_INIT: Provider[] = [
  {
    provide: APP_BASE_HREF,
    useValue: '/Angular'
  },
  {
    provide: RouteReuseStrategy,
    useClass: AppRouteReuseStrategy
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializePreference,
    deps: [ThemeService],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializeToast,
    deps: [LoggingService, ToastService],
    multi: true
  },
  {
    provide: APP_BOOTSTRAP_LISTENER,
    useFactory: bootstrapAppRouteFactory,
    deps: [Router],
    multi: true
  }
];
