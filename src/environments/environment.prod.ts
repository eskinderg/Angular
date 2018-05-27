export const environment = {
  production: true,

  EVENTS_API: 'http://localhost:5000/api/events/',
  API: 'http://localhost:5000',

  Auth : {
    authority: 'http://eskinder.auth0.com',
    client_id: '6WwnRJvXZ35ZmOF4rwZiZU3C4Fn0dOeB',
    client_secret: 'T-otnDTDUz1pWBzJMR4cfmCThAnf3pwlbK88eGWoVlFj0PwZghrrT6MOhGDzJ8IS',
    redirect_uri: 'http://eskinder.net/authorize',
    post_logout_redirect_uri: 'http://eskinder.net',
    popup_post_logout_redirect_uri: 'http://eskinder.net',
    response_type: 'id_token token',
    scope: 'openid email profile api1 api2.full_access',
    silent_redirect_uri: 'http://eskinder.net/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    silentRequestTimeout: 200,
    filterProtocolClaims: true,
    loadUserInfo: true
  },
  MOVIES_API: 'https://api.themoviedb.org/3/',
  MOVIES_API_KEY: 'fed69657ba4cc6e1078d2a6a95f51c8c'

};
