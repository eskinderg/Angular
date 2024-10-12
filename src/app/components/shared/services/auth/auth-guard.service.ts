import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export function authGuard(): CanActivateFn {
    return () => {
        const oauthService: OAuthService = inject(OAuthService);
        const router: Router = inject(Router);

        if (oauthService.hasValidAccessToken()) {
            return true;
        } else {
            router.navigate(['/']);
            // this.oauthService.initLoginFlow();
            return false;
        }
    };
}
