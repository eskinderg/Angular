// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  TODO_API: 'http://localhost:3000',
  API: 'http://localhost:3000',

  Auth : {
    authority: 'http://localhost:5000',
    client_id: 'oidcCLIENT',
    redirect_uri: 'http://localhost:4200/authorize',
    post_logout_redirect_uri: 'http://localhost:4200',
    response_type: 'id_token token',
    scope: 'openid email profile',
    silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    silentRequestTimeout: 200,
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
