import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthPermission {
    constructor(public oAuthService: OAuthService) {}

    get Roles() {
        return this.Token.realm_access.roles;
    }

    public hasPermission(permission: string): boolean {
        if (this.oAuthService.hasValidAccessToken()) {
            return this.Roles.includes(permission);
        } else return false;
    }

    private get Token(): any {
        return JSON.parse(atob(this.oAuthService.getAccessToken().split('.')[1]));
    }
}
