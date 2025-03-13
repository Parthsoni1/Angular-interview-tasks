import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DateHeaderInterceptor } from './interceptors/date.interceptor';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/user.effect';
import { PostEffects } from './store/post.effect';

export const appConfig: ApplicationConfig = {
  
  providers: [provideHttpClient(withInterceptors([TokenInterceptor, DateHeaderInterceptor])),
  provideStore({ users: userReducer }),
  provideEffects(UserEffects),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding())]
};
