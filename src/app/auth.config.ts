import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer               : 'http://idsrv-ubuntu:5000/auth/realms/master',
  requireHttps         : false,
  redirectUri          : window.location.origin,
  clientId             : 'Angular6',
  responseType         : 'code',
  disableAtHashCheck   : true,
  scope                : ' openid profile api2',
  showDebugInformation : true
}
