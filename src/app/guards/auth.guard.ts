import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    platformId = inject(PLATFORM_ID); 
  
  canActivate(): boolean {
  const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('auth_token'):  null ;
    const isAuthenticated = token !==  null;
    return isAuthenticated;
  }
}
