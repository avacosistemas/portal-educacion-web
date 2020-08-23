// import { PREFIX_DOMAIN_API } from "./environment";

export const PREFIX_DOMAIN_API =  'http://localhost:8080/';

export const environment = {
  production: true,

  apiServiceAuth: PREFIX_DOMAIN_API + 'ws-rest-authentication-cliente/',
  apiService: PREFIX_DOMAIN_API + 'ws-rest-educacion/',
  apiServiceCliente: PREFIX_DOMAIN_API + 'ws-rest-educacion-cliente/',
  recaptchaKey: '6Ldqw74ZAAAAAPrTwwBfaQcsehEPggd0QpJMh6dd',

  localAuth: false,
  security: true,
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
