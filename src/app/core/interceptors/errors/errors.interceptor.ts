import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  //the logic is for response
  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    return throwError(() => {
      toastrService.error(err.error.message, 'AldoraCart', {
        closeButton: true,
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing'
      })
    })
  }));
};
