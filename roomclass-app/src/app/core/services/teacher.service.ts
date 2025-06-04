// teacher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Teacher, TeacherInfo, TeacherShowable } from '../models/teacher';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private ListApiUrl = 'http://localhost:8001/AcademApi/avaliableTeachers/';
  private CreateApiUrl = 'http://localhost:8001/AcademApi/teacherCreateByCoordinator/';
  private UnactivateApiUrl = 'http://localhost:8001/AcademApi/unactivateTeacher/';
  private ViewApiUrl = 'http://localhost:8001/AcademApi/teacher/';
  private patchApiUrl = 'http://localhost:8001/AcademApi/patchTeacher/';
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
    return this.http.post(this.CreateApiUrl, body, {headers: this.getAuthHeaders()});
  }

  unactivateTeacher(id: number): Observable<any> {
    const url = `${this.UnactivateApiUrl}${id}/`;
    return this.http.patch(url, {},{ headers: this.getAuthHeaders() });
  }

  editTeacher(id: number, body: any): Observable<any> {
    const url = `${this.patchApiUrl}${id}/`;
    return this.http.patch(url, body, { headers: this.getAuthHeaders() });
  }

  getTeacherById(id: number): Observable<Teacher> {
    const url = `${this.ViewApiUrl}${id}/`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() })
  }
}