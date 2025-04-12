import { NgModule, provideAppInitializer } from '@angular/core';
import { DefaultOAuthInterceptor, OAuthLogger, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { initializeAuth } from './auth.init';
import { OAuthAppLogger } from './auth.logger';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.API_URL],
                sendAccessToken: true
            }
        })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true },
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
