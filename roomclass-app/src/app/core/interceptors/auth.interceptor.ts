import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del localStorage o de un servicio de auth
    const token = this.authService.getToken();    
    // Si no hay token, sigue sin modificar la petición
    if (!token) {
      return next.handle(req);
    }

    // Clonar la petición para agregar el token en el header Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }      
    });    

    // Continuar con la petición modificada
    return next.handle(authReq);
  }
}
