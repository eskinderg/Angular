import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { LoggingService } from './error/loggingservice';
import { AuthorizationModule } from './components/authorization/authorization.module';
import { AppRoutingModule } from './app-routing.module';
import { NgaModule } from './fragments/nga.module';
import { SharedModule } from './components/shared/shared.module';
import { UnauthorizedModule } from './components/unauthorized/unauthorized.module';
import { NotfoundModule } from './components/shared/404/404.module';
import { AppComponent } from './app.component';

import { appReducer, metaReducers } from './reducers';
import { NotesEffect, EventsEffect, AuthEffect, PreferenceEffect } from './effects';

import { NotesDataService } from './components/notes/services/notes.data.service';
import { EventDataService } from './fragments/components/event/event.data.service/event.data.service';
import { environment } from '../environments/environment';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

import { NgbdToastGlobalModule } from './shared/toast/toast.global.module';
import { APP_INIT } from './app.init';

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
    OAuthModule.forRoot(),
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
    OAuthService,
    APP_INIT
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
