import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MessageConstants } from '../constants/message-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private toastrService: ToastrService) { }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    return next.handle(request).pipe(catchError(err => {
      if (err && err.status) {
        switch (err.status) {
          case 500:
            this.toastrService.error(MessageConstants.ERROR_500);
            break;
          case 404:
            this.toastrService.error(MessageConstants.ERROR_404);
            break;
          case 403:
            this.toastrService.error(err.error.message);
            break;
          default:
            this.toastrService.error(`${MessageConstants.ERROR} ${err.status}`);
            break;
        }
      } else {
        this.toastrService.error(MessageConstants.ERROR_DEFAULT);
      }
      return next.handle(err);
    }));
  }
}
