import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { GlobalErrorHandler } from './error/errorhandle';
import { LoggingService } from './error/loggingservice';
import { AuthorizationModule } from './components/authorization/authorization.module';
import { AppRoutingModule } from './app-routing.module';
import { NgaModule } from './theme/nga.module';
import { SharedModule } from './components/shared/shared.module';
import { UnauthorizedModule } from './components/unauthorized/unauthorized.module';
import { NotfoundModule } from './components/shared/404/404.module';
import { AppComponent } from './app.component';

import { GlobalHttpInterceptor } from './http.interceptor';

import { appReducer, metaReducers } from './reducers';
import { NotesEffect, EventsEffect, AuthEffect, PreferenceEffect } from './effects';

import { NotesDataService } from './components/notes/services/notes.data.service';
import { EventDataService } from './theme/components/event/event.data.service/event.data.service';
import { environment } from '../environments/environment';
import { OAuthModule } from 'angular-oauth2-oidc';

import { NgbdToastGlobalModule } from './shared/toast/toast.global.module';
import { initializeApp } from './app.initializer';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    UnauthorizedModule,
    NgbdToastGlobalModule,
    NotfoundModule,
    AuthorizationModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer, { metaReducers }),
    EffectsModule.forRoot([NotesEffect, EventsEffect, AuthEffect, PreferenceEffect]),
    StoreDevtoolsModule.instrument(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:3000/api'],
        sendAccessToken: true
      }
    }),
    NgaModule.forRoot(),
    SharedModule.forRoot(),
    NgbModule,
    !environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: false }),
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    NotesDataService,
    EventDataService,
    LoggingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Store],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
