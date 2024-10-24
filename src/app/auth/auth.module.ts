import { APP_INITIALIZER, NgModule } from '@angular/core';
import { OAuthLogger, OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { initializeAuth } from './auth.init';
import { LoggingService } from '../error/loggingservice';
import { OAuthAppLogger } from './auth.logger';

@NgModule({
    imports: [OAuthModule.forRoot()],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAuth,
            deps: [OAuthService, Store, LoggingService],
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
