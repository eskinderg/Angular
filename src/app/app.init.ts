import { APP_INITIALIZER, APP_BOOTSTRAP_LISTENER, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouteReuseStrategy, Router } from '@angular/router';
import { LoggingService } from './error/loggingservice';
import { NotificationService } from './shared/notification/notification.service';
import { bootstrapAppRouteFactory } from './init/app.init.route';
import { initializeErrorLogger } from './init/app.init.logger';
import { GlobalErrorHandler } from './error/errorhandle';
import { AppRouteReuseStrategy } from './init/app.init.routeStrategy';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpErrorInterceptor } from './error/http.error.interceptor';

export const APP_INIT = [
    {
        provide: APP_BASE_HREF,
        useValue: '/'
    },
    LoggingService,
    provideHttpClient(withInterceptors([HttpErrorInterceptor])),
    {
        provide: RouteReuseStrategy,
        useClass: AppRouteReuseStrategy
    },
    {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
    },
    {
        provide: APP_INITIALIZER,
        useFactory: initializeErrorLogger,
        deps: [LoggingService, NotificationService],
        multi: true
    },
    {
        provide: APP_BOOTSTRAP_LISTENER,
        useFactory: bootstrapAppRouteFactory,
        deps: [Router],
        multi: true
    }
];
