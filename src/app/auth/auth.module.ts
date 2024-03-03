import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { OAuthLogger, OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { initializeAuth } from './auth.init';
import { ToastService } from '../shared/toast/toast.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthJWT } from './auth.JWT';
import { LoggingService } from '../error/loggingservice';

@Injectable()
export class OAuthAppLogger extends OAuthLogger {
  constructor(public logg: ToastService) {
    super();
  }

  override debug(message?: any, ...optionalParams: any[]): void {
    console.info(optionalParams);
    this.logg.showSuccess(message, 'OAuth Debug');
  }
  override info(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Info');
  }
  override log(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Log');
  }
  override warn(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Warn');
  }
  override error(message?: any, ...optionalParams: any[]): void {
    console.log(optionalParams);
    this.logg.showSuccess(message, 'OAuth Error');
  }
}

@NgModule({
  imports: [OAuthModule.forRoot()],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthJWT,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [OAuthService, Store, ToastService, LoggingService],
      multi: true
    },
    {
      provide: OAuthStorage,
      useValue: localStorage
    },
    {
      provide: OAuthLogger,
      useClass: OAuthAppLogger
    }
  ]
})
export class AuthModule {}
