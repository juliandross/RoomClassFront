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
    return this.httpClient.get<Subject[]>(this.apiUrl);
  }

  postSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(this.apiUrl, subject);
  }

  putSubject(id: Number, subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(`${this.apiUrl}${id}/`, subject);
  }

  deleteSubject(id: Number, subject: Subject): Observable<void> {
    subject.is_active = false;
    return this.httpClient.put<void>(`${this.apiUrl}${id}/`, subject);
  }

  viewSubject(id: Number): Observable<Subject> {
    return this.httpClient.get<Subject>(`${this.apiUrl}${id}/`);
  }

  editSubject(id: Number, subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(`${this.apiUrl}${id}/`, subject);
  }

  getSubjectById(id: number): Observable<Subject>{
     return this.httpClient.get<Subject>(`${this.apiUrl}${id}/`); 
  }
}