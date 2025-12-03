import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authHeader = inject(AuthService).headers();

  // Solo agrega el header si no existe aún (evita sobreescribir el que puso authInterceptor)
  const authReq = authHeader && !req.headers.has('Authorization')
    ? req.clone({ setHeaders: { Authorization: authHeader } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // limpia token
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        // redirige a login
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
