import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { events } from './reducers/events.reducer';
import { EventsEffect } from './effects/events.effect';

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


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    UnauthorizedModule,
    HomeModule,
    NotfoundModule,
    AuthorizationModule,
    BrowserAnimationsModule,
    StoreModule.provideStore({ events }, { events: [] }),
    EffectsModule.run(EventsEffect),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5,
      monitor: events
    }),
    NgaModule.forRoot(),
    SharedModule.forRoot(),
    NgbModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
    LoggingService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
