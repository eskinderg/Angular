import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';

import { AppRouterStateSerializer } from './init/app.route.serilizer';
import { appRoutes } from './app-routing.module';
import { APP_INIT } from './app.init';
import { NgaModule } from './fragments/nga.module';
import { appReducer } from './store/reducers';
import { metaReducers } from './store/reducers';
import { AuthEffect, EventsEffect, NotesEffect, PreferenceEffect, RouterEffect } from './store/effects';
import { AuthModule } from './auth/auth.module';
import { ThemeModule } from './theme/theme.module';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideHttpClient(),
        provideAnimations(),
        provideOAuthClient(),
        APP_INIT,
        importProvidersFrom(NgaModule.forRoot()),
        importProvidersFrom(
            StoreRouterConnectingModule.forRoot({
                serializer: AppRouterStateSerializer
            })
        ),
        importProvidersFrom(AuthModule),
        importProvidersFrom(ThemeModule),
        provideStore(appReducer, { metaReducers }),
        provideEffects([NotesEffect, EventsEffect, AuthEffect, PreferenceEffect, RouterEffect]),
        provideStoreDevtools({ maxAge: 25, logOnly: false })
    ]
};
