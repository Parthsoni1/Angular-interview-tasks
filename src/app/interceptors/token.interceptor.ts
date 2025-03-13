import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { isPlatformBrowser } from '@angular/common';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = Inject(UserService);
  const platformId = Inject(PLATFORM_ID); 
  // const token = 'ce6dcd2d9ab71bed5ce42c9ba649956a29433676b1ff539b30a760fe37da1182'; 
  console.log('isPlatformBrowser',isPlatformBrowser(platformId));
  
  const token = isPlatformBrowser(platformId) ? '' : localStorage.getItem('auth_token');
  
  console.log('token', token);
  
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
      }
      return throwError(error);
    })
  );
};