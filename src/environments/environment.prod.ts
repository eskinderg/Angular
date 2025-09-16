export const environment = {
    appVersion: require('../../package.json').version,
    production: true,
    EVENTS_API_URL: 'http://localhost:3000/api/events/',
    NOTES_API_URL: 'http://localhost:3000/api/notes/',
    API_URL: 'http://localhost:3000',

    Auth: {
        authority: 'http://esk-linux-u23:8080/realms/master',
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
