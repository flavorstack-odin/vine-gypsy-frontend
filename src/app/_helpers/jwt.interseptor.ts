// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { environment } from '../../environments/environment';
// import { SessionManagerService } from '../_services/session/session-manager.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private sessionManager: SessionManagerService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // add auth header with jwt if user is logged in and request is to the api url
//     const isLoggedIn = this.sessionManager.isloggedIn;
//     console.log(this.sessionManager.getToken());
//     const isApiUrl = request.url.startsWith(environment.apiUrl);
//     if (isLoggedIn && isApiUrl) {
//       let token = this.sessionManager.getToken();
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }

//     return next.handle(request);
//   }
// }
