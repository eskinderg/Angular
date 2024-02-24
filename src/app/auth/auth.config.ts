import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://esk-linux-u23:8080/realms/master',
  requireHttps: false,
  redirectUri: window.location.origin,
  clientId: 'Angular6',
  responseType: 'code',
  disableAtHashCheck: true,
  scope: 'openid profile api2',
  showDebugInformation: true
};
