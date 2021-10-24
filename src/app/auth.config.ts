import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://192.168.1.5:8080/auth/realms/master',
  requireHttps: false,
  redirectUri: window.location.origin,
  clientId: 'Angular7',
  responseType: 'id_token token',
  disableAtHashCheck: true,
  scope: ' openid profile api2',
  showDebugInformation: true,
  oidc: false

}
