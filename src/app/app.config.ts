import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { appRoutes } from './app-routing.module';
import { APP_INIT } from './app.init';
import { NgaModule } from './fragments/nga.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRouterStateSerializer } from './init/app.route.serilizer';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/reducers';
import { metaReducers } from './store/reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffect, EventsEffect, NotesEffect, PreferenceEffect, RouterEffect } from './store/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { provideAnimations } from '@angular/platform-browser/animations';
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
