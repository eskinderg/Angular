// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  appVersion: require('../../package.json').version,
  production: true,
  EVENTS_API: 'http://localhost:3000/api/events/',
  NOTES_API: 'http://localhost:3000/api/notes/',
  API: 'http://localhost:3000',
  Auth: {
    authority: 'http://localhost:5000',
    client_id: 'Angular6',
    // client_secret                    : 'T-otnDTDUz1pWBzJMR4cfmCThAnf3pwlbK88eGWoVlFj0PwZghrrT6MOhGDzJ8IS',
    redirect_uri: 'http://localhost:4200/authorize',
    post_logout_redirect_uri: 'http://localhost:4200/',
    popup_post_logout_redirect_uri: 'http://localhost:4200',
    response_type: 'id_token token',
    scope: 'openid email profile api2.full_access',
    silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 60,
    silentRequestTimeout: 200,
    filterProtocolClaims: true,
    loadUserInfo: true
  },
  MOVIES_API: 'https://api.themoviedb.org/3/',
  MOVIES_API_KEY: 'fed69657ba4cc6e1078d2a6a95f51c8c'
};
