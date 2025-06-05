import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../models/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8001/AcademApi/subject/';
  private baseUrl = 'http://localhost:8001/AcademApi/';  
  constructor(private httpClient: HttpClient) {} 

  getSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${this.baseUrl}listAvailableSubjects/`);
  }

  postSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(this.apiUrl, subject);
  }

  putSubject(id: Number, subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(`${this.apiUrl}${id}/`, subject);
  }

  deleteSubject(id: Number): Observable<void> {
    return this.httpClient.patch<void>(`${this.apiUrl}${id}/`,{});
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