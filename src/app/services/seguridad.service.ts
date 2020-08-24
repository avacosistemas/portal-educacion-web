import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import { Router } from "@angular/router";
import { Usuario } from "../entities/usuario";

@Injectable({
  providedIn: 'root'
})
export class SeguridadService
{

  jwt: JwtHelperService;
  private _isLogged: boolean;
  private _tokenKey = 'teachTokenKey';
  private _userKey = 'teachUserkey';
  private _token = '';
  private _user: Usuario;


  private _tipoUser = 0; // 0: no sabe no contesta, 1: profesor, 2: alumno



  constructor(
    private http: HttpClient,
    private router: Router,
  )
  {
    this._user = new Usuario();
    this._isLogged = false;
    this.jwt = new JwtHelperService();
  }

  public login(user: string, pass: string)
  {

    this.http.post(environment.apiServiceAuth + 'auth', {username: user, password: pass}).subscribe(
      (data: any) =>
      {
        if (data?.token)
        {
          if (!this.jwt.isTokenExpired(data.token))
          {

            this.http.get(environment.apiServiceAuth + 'cliente'
              , {headers: {'Authorization': 'Bearer ' + data.token }}
              ).subscribe(
              (value: any) => {

                this._user = {
                  username: value.username,
                  bloqueado: value.bloqueado,
                  password: null,
                  id: value.id,
                  accountNoExpired: value.accountNoExpired,
                  accountNonExpired: value.accountNonExpired,
                  accountNonLocked: value.accountNonLocked,
                  email: value.email,
                  intentosFallidosLogin: value.intentosFallidosLogin,
                  logged: value.logged,
                  tipoCliente: value.tipoCliente || 'ALUMNO',
                };

                this._tipoUser = (this._user.tipoCliente == 'ALUMNO') ? 2 : 1;
                this._setUser(this._user);
                this._setToken(data.token);
                this._isLogged = true;

              },
              error => {
                console.error(error);
                this.router.navigate(['/login']);
              }
            );
          }
        }
      },
      (ex: any) =>
      {
        this._isLogged = false;
        if (ex.error?.status && ex.error?.status === 'CHANGE_PASSWORD_REQUIRED')
        {
          this.router.navigate([ '/pwdchange' ]);
        }
        console.error(ex);
      }
    );

    return this._isLogged;
  }

  public getToken()
  {
    const tk = localStorage.getItem(this._tokenKey);
    if (tk)
    {
      this._token = tk;
    }
    return this._token;
  }

  private _setToken(token: string)
  {
    if (token)
    {
      this._token = token;
      localStorage.setItem(this._tokenKey, this._token);
    }
  }


  public getUser() : Usuario
  {
    if (!(this._user.id > 0)) {
      this._loadUser();
    }
    return this._user;
  }

  private _loadUser()
  {
    const ur = localStorage.getItem(this._userKey);
    if (ur)
    {
      this._user = JSON.parse(ur);
      this._tipoUser = (this._user.tipoCliente == 'ALUMNO') ? 2 : 1;
    }
  }

  private _setUser(user: Usuario)
  {
    localStorage.setItem(this._userKey, JSON.stringify(this._user));
  }

  public passwordReset(user: string) {
    const uri = environment.apiServiceAuth + 'password/reset/';
    return this.http.post(uri, user);
  }

  public passwordUpdate(pwd: string, newPwd: string ) {
    const uri = environment.apiServiceAuth + 'password/update/';

    const data = {newPassword: newPwd, password: pwd, username: this.getUser().username};

    return this.http.post(uri, data);
  }

  public logout()
  {
    localStorage.removeItem(this._tokenKey);
    this._token = null;
    this._isLogged = false;
  }

  public isLogged(): boolean
  {
    if (!this._isLogged)
    {
      if (!this._token)
      {
        this.getToken();
        if (!this._token)
        {
          return false;
        }
      }
      this._isLogged = !this.jwt.isTokenExpired(this._token);
    }
    return this._isLogged;
  }

  public isAlumno()
  {
    if (this._tipoUser == 0)
    {
      this._loadUser();
    }
    return (this._tipoUser == 2);
  }
  public isProfesor()
  {
    if (this._tipoUser == 0)
    {
      this._loadUser();
    }
    return (this._tipoUser == 1);
  }


}
