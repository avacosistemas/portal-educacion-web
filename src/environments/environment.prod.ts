export const PREFIX_DOMAIN_API =  'http://localhost:8080/';

export const environment = {
    localAuth: false,
    security: true,
    production: true,
    hmr       : false,
    dummyServices: false,
    recaptchaKey: 'a definir',

    /** AUTHENTICATION */
    AUTHENTICATION_URL:  PREFIX_DOMAIN_API + '/ws-rest-authentication/auth',
    AUTHENTICATION_REFRESH_TOKEN_URL:  PREFIX_DOMAIN_API + '/ws-rest-authentication/refresh',

    /* Config General URl*/
    URL_ROOT: '',
    URL_LOGIN: '/auth/login',

    URL_LOGOUT_API: PREFIX_DOMAIN_API + 'user/logout',
};

