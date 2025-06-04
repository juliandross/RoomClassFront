import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { delay, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user'; // Asegúrate de que la ruta sea correcta

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000'; 
  private user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    console.log('Login called with:', email, password);
    return this.http.post<{access: string; refresh: string}>(`${this.apiUrl}/api/token/`, { email, password }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.access);     
      })
    );
    // Simulación de un login exitoso
    /*const fakeToken = 'fake-jwt-token';
    return of({ token: fakeToken }).pipe(      
      tap(response => {
        sessionStorage.setItem('token', response.token);
      })
    );*/
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) { //We check if the window object is defined
      sessionStorage.removeItem('token');      
    }    
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return sessionStorage.getItem('token'); // Obtener el token del sessionStorage
  }
  return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Si hay token, el usuario está "autenticado"
  }
  //Se debe hacer un método para obtener el perfil del usuario por medio de su email
  getProfile(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    const id = this.getUserIdFromToken(token);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, { headers }).pipe(
      tap(perfil => {
        this.user = perfil;
      })
    );
  }
    // Simulación de una llamada a la API para obtener el perfil del usuario
    /*return of({
      name: 'John Doe',
      email: 'john@gmail.com',
      role: 'admin'
    }).pipe(
      delay(1000), // simula una pequeña espera
      tap(perfil => this.user = perfil) // Guarda en caché local
    );*/    
  
  getUser(): User | null {
    console.log('Obteniendo usuario:', this.user);
    return this.user;
  }
  getUserRole(): string | null {
    return this.user ? this.user.rol : null;
  }
  getUserIdFromToken(token: string): number | null {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const payloadObj = JSON.parse(decoded);
    return payloadObj.user_id ?? null;
  } catch (e) {
    return null;
    }
  }
}


