import {
    ApplicationConfig,
    importProvidersFrom,
    provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { appRoutes } from './app-routing.module';
import { APP_INIT } from './app.init';
import { appReducer } from './store/reducers';
import { metaReducers } from './store/reducers';
import { appEffects } from './store/effects';
import { appModules } from './app.modules';
import { appInterceptors } from './interceptors';
import { AdminEffect } from './admin/store/effects/admin.effect';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideOAuthClient(),
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi(), withInterceptors(appInterceptors)),
        provideRouter(appRoutes, withComponentInputBinding()),
        importProvidersFrom(appModules),
        provideStore(appReducer, { metaReducers }),
        provideEffects(...appEffects, AdminEffect),
        provideStoreDevtools(),
        APP_INIT
    ]
};
