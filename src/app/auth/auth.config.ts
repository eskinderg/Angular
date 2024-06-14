import { isDevMode } from '@angular/core';
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

export const authGoogleConfig: AuthConfig = {
  requireHttps: false,
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  clientId: '35558275617-qa2pthvce7ccunhrv0708lsbnp2vsonj.apps.googleusercontent.com',
  redirectUri: isDevMode() ? 'http://localhost:4200/Angular' : 'https://eskinderg.github.io',
  scope: 'openid profile email',
  showDebugInformation: true,
  sessionChecksEnabled: true
};
