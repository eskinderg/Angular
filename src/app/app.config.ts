import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { appRoutes } from './app-routing.module';
import { APP_INIT } from './app.init';
import { appReducer } from './store/reducers';
import { metaReducers } from './store/reducers';
import { appEffects } from './store/effects';
import { appModules } from './app.modules';
import { appInterceptors } from './interceptors';

export const appConfig: ApplicationConfig = {
    providers: [
        provideOAuthClient(),
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch(), withInterceptorsFromDi(), withInterceptors(appInterceptors)),
        provideRouter(appRoutes, withComponentInputBinding()),
        importProvidersFrom(appModules),
        provideStore(appReducer, { metaReducers }),
        provideEffects(...appEffects),
        provideStoreDevtools(),
        APP_INIT
    ]
};
