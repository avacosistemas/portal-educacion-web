// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const PREFIX_DOMAIN_API =  'http://ec2-18-215-75-115.compute-1.amazonaws.com:8080/';

export const environment = {

    apiServiceAuth: PREFIX_DOMAIN_API + 'ws-rest-authentication-cliente/',
    apiService: PREFIX_DOMAIN_API + 'ws-rest-educacion/',
    recaptchaKey: '6LdpJL0ZAAAAAO_vludMBF1k-27PZqUwcWe8atI4',

    localAuth: false,
    security: true,
    production: false,
    hmr       : false,
    dummyServices: false,

    /** AUTHENTICATION */
    AUTHENTICATION_URL:  PREFIX_DOMAIN_API + '/ws-rest-authentication/auth',
    AUTHENTICATION_REFRESH_TOKEN_URL:  PREFIX_DOMAIN_API + '/ws-rest-authentication/refresh',

    /* Config General URl*/
    URL_ROOT: '',
    URL_LOGIN: '/auth/login',

    URL_LOGOUT_API: PREFIX_DOMAIN_API + 'user/logout',
};

