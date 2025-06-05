import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { AssignSubject } from '../models/assign-subject';
import { PaginatedResponse } from '../models/paginated-response';
import {Subject} from '../models/subject'
import { Period } from '../models/period';
import { Teacher } from '../models/teacher';
@Injectable({
  providedIn: 'root'
})
export class AssignSubjectService {
  private apiUrl = 'http://localhost:8001/AcademApi/subjectReport/';
  private apiUrlPost = 'http://localhost:8001/AcademApi/subjectTeacherPeriod/';
  constructor(private httpClient:HttpClient) { }
  getAssignSubjects(page: number = 1): Observable<AssignSubject[]> {
    const params = new HttpParams().set('page', page.toString());

    return this.httpClient
      .get<PaginatedResponse<AssignSubject>>(this.apiUrl, { params })
      .pipe(
        map(response =>
          response.results.map(assign => ({
            ...assign,
            displayName: `${assign.period.perSemester} - ${assign.subject.subjectName} - ${assign.teacher.first_name} ${assign.teacher.last_name}`
          }))
        )
      );
  }
  getAssignSubjectById(id: number): Observable<AssignSubject> {
    return this.httpClient.get<AssignSubject>(`${this.apiUrl}${id}/`);
  }

  postAssignSubject(subjectId: number, teacherId: number, periodId: number): Observable<AssignSubject> {
    const body = { subject: subjectId, teacher: teacherId, period: periodId };
    return this.httpClient.post<AssignSubject>(this.apiUrlPost, body);
  }

  deleteAssignSubject(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrlPost}${id}/`);
  }
  getRAById(raId: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8001/AcademApi/subjectRA/${raId}/`);
  }
}


