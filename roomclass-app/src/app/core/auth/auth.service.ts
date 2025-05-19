import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; //Unrealistic URL for the API

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    /*return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );*/
    // Simulación de un login exitoso
    const fakeToken = 'fake-jwt-token';
    return of({ token: fakeToken }).pipe(
      delay(1000), // simula una pequeña espera
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Si hay token, el usuario está "autenticado"
  }
}
