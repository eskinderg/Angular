import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'Angular6',
  responseType: 'id_token token',
  scope: ' openid profile api2',
  showDebugInformation: true,
  oidc: false
}
