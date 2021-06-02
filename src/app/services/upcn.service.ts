import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { DOMAIN, PREFIX_DOMAIN_API } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UpcnService {

  readonly upcnUrl = 'https://sso.upcnba.org/auth';
  stateHash: string;
  constructor(private http: HttpClient,
              private seguridadService: SeguridadService) { }

  public getUrlLoginUpcn(): string {
    const guid = Guid.create().toString();
    localStorage.setItem('state', guid);
    this.stateHash = Md5.hashStr(guid);
    return `${this.upcnUrl}?prompt=login&scope=openid datosPersonalesBasicos
            &state=${this.stateHash}&response_type=code&redirect_uri=${DOMAIN}/upcnCallBack&client_id=teachonline`;
  }

  login(code: string, state: string, onCallback): any {
    this.http.get(`${PREFIX_DOMAIN_API}ws-rest-authentication-cliente/authUpcn?code=${code}&state=${state}`)
    .subscribe(
      (data: any) => {
        this.seguridadService.getUserWithToken(data, onCallback);
      }
    );
  }
}
