import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthorizationModule } from './authorization/authorization.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { HomeModule } from './home/home.module';
import { UnauthorizedModule } from './unauthorized/unauthorized.module';
import { NotfoundModule } from './shared/404/404.module';
import { AppComponent } from './app.component';


// import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [
          BrowserModule,
          HttpModule,
          AppRoutingModule,
          UnauthorizedModule,
          HomeModule,
          NotfoundModule,
          AuthorizationModule,
          SharedModule.forRoot(),
          NgbModule.forRoot()
  ],
  declarations: [AppComponent],
  // providers: [{
  //   provide: LocationStrategy,
  //   useClass: HashLocationStrategy
  // }],
  bootstrap: [AppComponent]

})
export class AppModule { }
