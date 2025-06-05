import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear();
    }
  }
  public saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.setItem('token', token);
    }
  }

  public saveUser(user: any): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      console.log("Saving user:", user);
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    console.log("Saved user:", user);
  }

  public getUser(): any {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        console.log("Retrieved user:", user);
        return JSON.parse(user);
      }
    }
    return null;
  }

  getToken(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return sessionStorage.getItem('token'); // Obtener el token del sessionStorage
  }
  return null;
  }

  public isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = window.sessionStorage.getItem(USER_KEY);
      return user !== null;
    }
    return false;
  }
  public isAuthenticated(): boolean {
    return !!this.getToken(); // Si hay token, el usuario está "autenticado"
  }
  public isCoordinador(): boolean {
    const user = this.getUser();
    console.log('User role:', user ? user.rol : 'No user found');
    return user && user.rol === 'COORDINADOR'; // Verifica si el rol del usuario es 'coordinador'
  }
}
