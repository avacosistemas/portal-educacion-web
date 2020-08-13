import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService
{

  private _isLogged: boolean;
  private tokenKey = 'teachTokenKey';
  private userKey = 'teachUserkey';
  private _token = '';
  jwt: JwtHelperService;

  constructor(
    private http: HttpClient,
  )
  {
    this._isLogged = false;
    this.jwt = new JwtHelperService();
  }

  public login(user: string, pass: string)
  {

    // TODO: falta la separación de ambientes
    // Convendría usar una variable de ambiente para poder separar en entornos (dev, test, prod)
    // Ej: uri = environment.apiEndpoint + 'auth/login';
    // Sin embargo la url que pasaron es muy extraña.


    const uri = environment.apiServiceAuth + 'auth';
    // { "username": "agonzalez", "password": "beto" }
    // { "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ29uemFsZXoiLCJleHAiOjE1OTU4NTM2NjIsImlhdCI6MTU5NTI0ODg2Mn0.LG6iOZDPvziXUtsz47NlSVphWVWdrAaxzLh3KVSYSSrSyxeGSX1VxMJucq_4SZ2I1VBoKnk579DEh4nDjPpYZw" }

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post(uri, {username: user, password: pass}, {headers: headers}).subscribe(
      (data: any) =>
      {
        if (data?.token)
        {
          if (!this.jwt.isTokenExpired(data.token))
          {
            this.setToken(data.token);
            this._isLogged = true;
          }
        }
      },
      (ex) =>
      {
        this._isLogged = false;
        console.error(ex);
      }
    );

    return this._isLogged;
  }

  public getToken()
  {
    const tk = localStorage.getItem(this.tokenKey);
    if (tk)
    {
      this._token = tk;
    }
    return this._token;
  }

  public setToken(token: string)
  {
    if (token)
    {
      this._token = token;
      localStorage.setItem(this.tokenKey, this._token);
    }
  }

  public passwordReset(user: string) {
    const uri = environment.apiServiceAuth + 'password/reset/';
    return this.http.post(uri, user);
  }

  public passwordUpdate(user: string, pwd: string, newPwd: string ) {
    const uri = environment.apiServiceAuth + 'password/update/';

    const data = {newPassword: newPwd, password: pwd, username: user};

    return this.http.post(uri, data);
  }

  public logout()
  {
    localStorage.removeItem(this.tokenKey);
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
          this._isLogged = false;
        }
      }
      else
      {
        this._isLogged = !this.jwt.isTokenExpired(this._token);
      }
    }
    return this._isLogged;
  }

}
