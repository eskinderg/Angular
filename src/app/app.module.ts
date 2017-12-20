import { NgModule, ErrorHandler } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalErrorHandler  } from './error/errorhandle';
import { LoggingService } from './error/loggingservice';
import { AuthorizationModule } from './components/authorization/authorization.module';
import { AppRoutingModule } from './app-routing.module';
import { NgaModule } from './theme/nga.module';
import { SharedModule } from './components/shared/shared.module';
import { HomeModule } from './components/home/home.module';
import { UnauthorizedModule } from './components/unauthorized/unauthorized.module';
import { NotfoundModule } from './components/shared/404/404.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from './http.interceptor';

import { reducer, metaReducers } from './reducers';
import { NotesEffect } from './effects/notes.effect';
import { EventsEffect } from './effects/events.effect';
import { AuthEffect } from './effects/auth.effect';
import { NotesDataService } from './components/notes/services/notes.data.service';
import { EventDataService } from './theme/components/event/event.data.service/event.data.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UnauthorizedModule,
    HomeModule,
    NotfoundModule,
    AuthorizationModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    EffectsModule.forRoot([ NotesEffect, EventsEffect, AuthEffect ]),
    StoreDevtoolsModule.instrument(),
    NgaModule.forRoot(),
    SharedModule.forRoot(),
    NgbModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
    NotesDataService,
    EventDataService,
    LoggingService,
    {
      provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true
    },
    {
      provide: APP_BASE_HREF, useValue: '/'
    },
    {
      provide: ErrorHandler, useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
