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


  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.ListApiUrl);
  }

  
  createTeacher(body: any): Observable<any> {
    return this.http.post(this.CreateApiUrl, body);
  }

  unactivateTeacher(id: number): Observable<any> {
    const url = `${this.UnactivateApiUrl}${id}/`;
    return this.http.patch(url, {});
  }

  editTeacher(id: number, body: any): Observable<any> {
    const url = `${this.patchApiUrl}${id}/`;
    return this.http.patch(url, body);
  }

  getTeacherById(id: number): Observable<Teacher> {
    const url = `${this.ViewApiUrl}${id}/`;
    return this.http.get<any>(url)
  }
}