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
}