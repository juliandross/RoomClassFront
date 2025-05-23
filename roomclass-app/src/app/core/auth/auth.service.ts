import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';

export interface User{
  name: string;
  email: string;  
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 
  private user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    console.log('Login called with:', email, password);
    return this.http.post<{ token: string }>(`${this.apiUrl}/token/`, { email, password }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
      })
    );
    // Simulación de un login exitoso
    /*const fakeToken = 'fake-jwt-token';
    return of({ token: fakeToken }).pipe(
      delay(1000), // simula una pequeña espera
      tap(response => {
        localStorage.setItem('token', response.token);
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
    return sessionStorage.getItem('token');
  }
  return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Si hay token, el usuario está "autenticado"
  }
  getProfile(): Observable<User> {
    /*return this.http.get<User>(`${this.apiUrl}/usuario`).pipe(
      tap(perfil => this.user = perfil) // Guarda en caché local
    );*/
    // Simulación de una llamada a la API para obtener el perfil del usuario
    return of({
      name: 'John Doe',
      email: 'john@gmail.com',
      role: 'admin'
    }).pipe(
      delay(1000), // simula una pequeña espera
      tap(perfil => this.user = perfil) // Guarda en caché local
    );    
  }
  getUser(): User | null {
    return this.user;
  }
  getUserRole(): string | null {
    return this.user ? this.user.role : null;
  }
}
