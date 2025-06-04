// teacher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private ListApiUrl = 'http://localhost:8001/AcademApi/teacher/';
  private CreateApiUrl = 'http://localhost:8001/AcademApi/teacherCreateByCoordinator/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.ListApiUrl, { headers: this.getAuthHeaders() });
  }

  
  createTeacher(body: any): Observable<any> {
    return this.http.post(this.CreateApiUrl, body);
  }
}