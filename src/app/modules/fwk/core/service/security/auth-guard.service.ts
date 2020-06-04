import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return  new Observable<boolean>(obs => {
      if (environment.security === false){
        obs.next(true);
      } else {
        this.authService.isTokenExpired().subscribe(isTokenExpired => {
          if (isTokenExpired && route.routeConfig.path !== environment.URL_LOGIN){
            if (environment.localAuth === true){
              this.router.navigate(['/auth/login']);
            } else {
              window.location.href = environment.URL_LOGIN;
            }
          } else if (!isTokenExpired && route.routeConfig.path === environment.URL_LOGIN) {
            this.router.navigate(['/' + environment.URL_ROOT]);
          }
          obs.next(true);
        });
      }
    });
  }
}
