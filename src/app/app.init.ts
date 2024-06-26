import { APP_INITIALIZER, Provider, APP_BOOTSTRAP_LISTENER, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouteReuseStrategy, Router } from '@angular/router';
import { LoggingService } from './error/loggingservice';
import { ToastService } from './shared/toast/toast.service';
import { bootstrapAppRouteFactory } from './init/app.init.route';
import { initializeToast } from './init/app.init.toast';
import { GlobalErrorHandler } from './error/errorhandle';
import { AppRouteReuseStrategy } from './init/app.init.routeStrategy';

export const APP_INIT: Provider[] = [
    {
        provide: APP_BASE_HREF,
        useValue: '/'
    },
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
