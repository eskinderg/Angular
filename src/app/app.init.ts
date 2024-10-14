import { APP_INITIALIZER, APP_BOOTSTRAP_LISTENER, ErrorHandler, ApplicationRef } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouteReuseStrategy, Router } from '@angular/router';
import { LoggingService } from './error/loggingservice';
import { NotificationService } from './shared/notification/notification.service';
import { bootstrapAppRouteFactory } from './bootstrap/route';
import { initializeErrorLogger } from './init/app.init.logger';
import { GlobalErrorHandler } from './error/errorhandle';
import { AppRouteReuseStrategy } from './init/app.init.routeStrategy';
import { bootstrapAppNotificationFactory } from './bootstrap/notification';
import { bootstrapBackButtonFactory } from './bootstrap/backButton';

export const APP_INIT = [
    {
        provide: APP_BASE_HREF,
        useValue: '/'
    },
    LoggingService,
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
        deps: [Router, ApplicationRef],
        multi: true
    },
    {
        provide: APP_BOOTSTRAP_LISTENER,
        useFactory: bootstrapAppNotificationFactory,
        deps: [ApplicationRef],
        multi: true
    },
    {
        provide: APP_BOOTSTRAP_LISTENER,
        useFactory: bootstrapBackButtonFactory,
        deps: [ApplicationRef],
        multi: true
    }
];
