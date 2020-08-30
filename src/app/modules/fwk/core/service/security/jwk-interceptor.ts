import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

// import 'rxjs/add/operator/do';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from "../../../../../services/seguridad.service";

@Injectable({
  providedIn: 'root'
})
export class JwkInterceptor implements HttpInterceptor {

  constructor(public auth: SeguridadService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const headers = request.headers;
      if (this.auth.getToken()) {
        request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + this.auth.getToken())
        });
      }
      return next.handle(request);
  }
}
