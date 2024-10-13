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
import { HttpErrorInterceptor } from './error/http.error.interceptor';
import { AuthJWT } from './auth/auth.JWT';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withInterceptors([HttpErrorInterceptor, AuthJWT])),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideAnimations(),
        provideOAuthClient(),
        importProvidersFrom(appModules),
        provideStore(appReducer, { metaReducers }),
        provideEffects(appEffects),
        provideStoreDevtools({ maxAge: 25, logOnly: false }),
        APP_INIT
    ]
};
