import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NullValidationHandler, OAuthModule, OAuthService, ValidationHandler } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { initializeAuth } from './auth.init';
import { ToastService } from '../shared/toast/toast.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthJWT } from './auth.JWT';
import { LoggingService } from '../error/loggingservice';

@NgModule({
  imports: [OAuthModule.forRoot()],
  providers: [
    {
      provide: ValidationHandler,
      useClass: NullValidationHandler
    }
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializeAuth,
          deps: [OAuthService, Store, ToastService, LoggingService],
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthJWT,
          multi: true
        }
      ]
    };
  }
}
