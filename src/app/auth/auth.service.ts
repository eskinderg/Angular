import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthService extends OAuthService {
    public getUserId() {
        return this.getIdentityClaims()['sub'];
    }
}
