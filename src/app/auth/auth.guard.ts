import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthPermission } from './auth.permission.service';

export const authGuard: CanActivateFn = () => {
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

export const adminGuard: CanActivateFn = () => {
    const oauthService: OAuthService = inject(OAuthService);
    const permission: AuthPermission = inject(AuthPermission);
    // const router: Router = inject(Router);

    if (oauthService.hasValidAccessToken() && permission.IsAdmin) {
        return true;
    } else {
        // router.navigate(['/']);
        return false;
    }
};
