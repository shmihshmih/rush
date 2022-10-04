import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {TotalSpinnerService} from '../services/total-spinner.service';
import {map} from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private tss: TotalSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.tss.show();
    return next.handle(request).pipe(
      catchError((err) => {
        // this.tss.hide();
        return of(err);
      }),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          // this.tss.hide();
        }
        return evt;
      })
    );
  }
}
