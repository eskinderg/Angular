import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:5000',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'Angular6',
  responseType: 'id_token token',
  scope: 'openid email profile api2.full_access',
  showDebugInformation: true,
  oidc: false
}
