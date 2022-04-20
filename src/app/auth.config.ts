import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://eskoauth.us.auth0.com',
  requireHttps: false,
  redirectUri: 'https://eskinderg.github.io/Angular',
  clientId: 'CQruP3Sm2FlOMt1nLmTJRXrtZkUZrqj3',
  responseType: 'code',
  // disableAtHashCheck: true,
  scope: ' openid profile api2',
  showDebugInformation: true,
  dummyClientSecret: 'oLLLbCpud1GbJvTlAhX0nvhGTSO9f_SOQhuTz3eUvkHwkdrPUJdOHpqpY8sEaXvT',
  strictDiscoveryDocumentValidation: false,
  skipIssuerCheck: true

}
