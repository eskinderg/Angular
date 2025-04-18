import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthPermission {
    constructor(public oAuthService: OAuthService) {}

    public hasPermission(permission: string): boolean {
        if (this.oAuthService.hasValidAccessToken()) {
            try {
                return this.Roles.includes(permission);
            } catch (error) {
                return false;
            }
        } else return false;
    }

    private get Token(): any {
        try {
            return JSON.parse(atob(this.oAuthService.getAccessToken().split('.')[1]));
        } catch (error) {
            return null;
        }
    }

    get Roles() {
        return this.Token.realm_access.roles;
    }

    get IsAdmin() {
        return this.hasPermission('Admin');
    }
}
