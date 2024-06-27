import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
    issuer: environment.Auth.authority,
    requireHttps: environment.Auth.requireHttps,
    redirectUri: window.location.origin,
    clientId: environment.Auth.client_id,
    responseType: environment.Auth.response_type,
    disableAtHashCheck: environment.Auth.disableAtHashCheck,
    scope: environment.Auth.scope,
    showDebugInformation: environment.Auth.showDebugInformation
};
