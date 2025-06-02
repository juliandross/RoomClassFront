import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../models/subject';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8001/AcademApi/subject/';
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getSubjects(): Observable<Subject[]> {
    const token = this.authService.getToken(); // Usa el método de AuthService
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<Subject[]>(this.apiUrl, { headers });
  }

  postSubject(subject: Subject): Observable<Subject> {
    const token = this.authService.getToken(); // Usa el método de AuthService
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.post<Subject>(this.apiUrl, subject, { headers });
  }

  putSubject(id: Number,subject: Subject): Observable<Subject> {
    const token = this.authService.getToken(); // Usa el método de AuthService
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.put<Subject>(`${this.apiUrl}${id}`, subject, { headers });
  }

  deleteSubject(id: Number, subject: Subject): Observable<void> {
    //Solo desactiva el subject, no lo elimina
    subject.is_active = false; // Cambia el estado a false para desactivar
    const token = this.authService.getToken(); // Usa el método de AuthService
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.put<void>(`${this.apiUrl}${id}`, subject,{ headers });
  }

  viewSubject(id: Number): Observable<Subject> {
    const token = this.authService.getToken(); // Usa el método de AuthService
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<Subject>(`${this.apiUrl}${id}`, { headers });
  }

  editSubject(id: Number, subject: Subject): Observable<Subject> {
    const token = this.authService.getToken(); // Usa el método de AuthService
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.put<Subject>(`${this.apiUrl}${id}`, subject, { headers });
  }
}