import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest  } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class IntercepterService implements HttpInterceptor    {

  count = 0;

  constructor(private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    this.spinner.show(undefined, {
      type: 'ball-spin-fade-rotating',
      size: 'medium',
      bdColor: ' ',
      color: '#000000',
      fullScreen: true,
    });

    this.count++;

    // request = request.clone({ headers: request.headers.set('Authorization',
    //           `Bearer ${localStorage.getItem(environment.tokenKey)}`) }); // Token

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
          return event;
      }), finalize(() => {

        this.count--;

        if ( this.count === 0 ) { this.spinner.hide (); }
      }),
    );
  }

}
