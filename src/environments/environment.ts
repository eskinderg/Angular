/* eslint-disable @typescript-eslint/no-var-requires */
export const environment = {
    appVersion: require('../../package.json').version + '-dev',
    production: false,
    EVENTS_API_URL: 'http://192.168.100.5:3000/api/events',
    NOTES_API_URL: 'http://192.168.100.5:3000/api/notes',
    API_URL: 'http://192.168.100.5:3000/api',

    Auth: {
        authority: 'http://192.168.100.5:8080/realms/master',
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
