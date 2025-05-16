/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
export const environment = {
    appVersion: require('../../package.json').version + '-dev',
    production: false,
    EVENTS_API_URL: '/api/events',
    NOTES_API_URL: '/api/notes',
    Auth: {
        authority: require('../app/app.config.json').server + ':8080/realms/master',
        requireHttps: false,
        client_id: 'Angular6',
        response_type: 'code',
        disableAtHashCheck: true,
        scope: 'openid email profile api2',
        showDebugInformation: true
    },

    MOVIES_API_URL: 'https://api.themoviedb.org/3/',
    MOVIES_API_KEY: 'fed69657ba4cc6e1078d2a6a95f51c8c'
};
