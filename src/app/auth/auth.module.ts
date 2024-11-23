import { NgModule, provideAppInitializer } from '@angular/core';
import { OAuthLogger, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { initializeAuth } from './auth.init';
import { OAuthAppLogger } from './auth.logger';

@NgModule({
    imports: [OAuthModule.forRoot()],
    providers: [
        provideAppInitializer(initializeAuth()),
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
