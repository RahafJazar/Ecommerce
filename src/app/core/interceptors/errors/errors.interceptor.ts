import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const platform = inject(PLATFORM_ID)
  //the logic is for response
  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    return throwError(() => {
      if (isPlatformBrowser(platform)) {
        toastrService.error(err.error.message, 'AldoraCart', {
          closeButton: true,
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing'
        })
      }

    })
  }));
};
