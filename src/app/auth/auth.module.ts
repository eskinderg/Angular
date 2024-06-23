import { APP_INITIALIZER, NgModule } from '@angular/core';
import { OAuthLogger, OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { initializeAuth } from './auth.init';
import { ToastService } from '../shared/toast/toast.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthJWT } from './auth.JWT';
import { LoggingService } from '../error/loggingservice';
import { OAuthAppLogger } from './auth.logger';

@NgModule({
  imports: [OAuthModule.forRoot()],
  providers: [
    provideHttpClient(withInterceptors([AuthJWT])),
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
