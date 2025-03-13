import { HttpInterceptorFn } from '@angular/common/http';

export const DateHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  let dateHeaderReq = req.clone({
    setHeaders: {}
  });
  
  if (req.url.includes('comments')) {
  dateHeaderReq = req.clone({
    setHeaders: { 'X-Today-Date': new Date().toISOString() },
  });
}
  return next(dateHeaderReq);
  
};