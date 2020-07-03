import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged: boolean;
  constructor() {
    this._isLogged = false;
  }

  public login() {
    this._isLogged = true;
  }

  public logout() {
    this._isLogged = false;
  }

  public isLogged() : boolean {
    return this._isLogged;
  }

}
