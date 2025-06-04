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

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  postSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(this.apiUrl, subject, { headers: this.getAuthHeaders() });
  }

  putSubject(id: Number, subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(`${this.apiUrl}${id}`, subject, { headers: this.getAuthHeaders() });
  }

  deleteSubject(id: Number, subject: Subject): Observable<void> {
    subject.is_active = false;
    return this.httpClient.put<void>(`${this.apiUrl}${id}`, subject, { headers: this.getAuthHeaders() });
  }

  viewSubject(id: Number): Observable<Subject> {
    return this.httpClient.get<Subject>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  editSubject(id: Number, subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(`${this.apiUrl}${id}`, subject, { headers: this.getAuthHeaders() });
  }
}