import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { User } from '../../model/user';
import { HttpService } from '../http-service/http.service';
import { GenericHttpService } from '../generic-http-service/generic-http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const USER_DATA = 'user_data';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  private genericHttpService: GenericHttpService;

  constructor(protected injector: Injector) {
    super(injector, '');
    this.genericHttpService = injector.get(GenericHttpService);
  }


  logout() {
    this.genericHttpService.basicPost(environment.URL_LOGOUT_API, {}).subscribe(() => {
      this.localStorageService.remove(USER_DATA);
      this.localStorageService.cleanUserSession();
      window.location.href = environment.URL_LOGIN;
    });
  }

  isTokenExpired(): Observable<any> {
    return new Observable<any>(obs => {
      const token = this.getToken();
      if (token) {
        this.genericHttpService.basicPost(environment.AUTHENTICATION_REFRESH_TOKEN_URL, {token}).subscribe(response => {
          this.setToken(response.token);
          obs.next(false);
        }, e => {
          obs.next(true);
        });
      } else {
        obs.next(true);
      }
    });
  }

  login(username, password): Observable<any> {
    return new Observable((observer) => {
      this.genericHttpService.basicPost(environment.AUTHENTICATION_URL, {username, password}).subscribe(response => {
        this.setUser(response);
        this.setToken(response.token);
        observer.next(response);
      }, e => {
        observer.error(e);
      });
    });
  }

  getToken(): string {
    return this.localStorageService.getTokenData();
  }

  setToken(token: any): void{
    this.localStorageService.saveTokenData(token);
  }

  setUser(user: User): void {
    this.localStorageService.save(USER_DATA, user);
  }

  getUserLocalStorage(): any {
    return this.localStorageService.get(USER_DATA);
  }
}

