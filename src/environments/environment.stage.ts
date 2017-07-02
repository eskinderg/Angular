// stage environment

export const environment = {

  production: true,

  TODO_API: 'http://localhost:3000',
  API: 'http://localhost:3000',

  Auth : {
    authority: 'http://localhost:5000',
    client_id: 'oidcCLIENT',
    redirect_uri: 'http://localhost:4200/authorize',
    post_logout_redirect_uri: 'http://localhost:4200',
    response_type: 'id_token token',
    scope: 'openid email profile',
    silent_redirect_uri: 'http://localhost:4200/silent',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    silentRequestTimeout: 200,
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
