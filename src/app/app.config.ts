import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { appRoutes } from './app-routing.module';
import { APP_INIT } from './app.init';
import { appReducer } from './store/reducers';
import { metaReducers } from './store/reducers';
import { appEffects } from './store/effects';
import { appModules } from './app.modules';
import { appInterceptors } from './interceptors';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideOAuthClient(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withInterceptors(appInterceptors)),
        provideRouter(appRoutes, withComponentInputBinding()),
        importProvidersFrom(appModules),
        provideStore(appReducer, { metaReducers }),
        provideEffects(appEffects),
        provideStoreDevtools(),
        APP_INIT
    ]
};
