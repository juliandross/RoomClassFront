import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { AssignSubject } from '../models/assign-subject';
import { PaginatedResponse } from '../models/paginated-response';
import {Subject, SubjectCompetence, SubjectRA} from '../models/subject'
import { Period } from '../models/period';
import { Teacher } from '../models/teacher';
@Injectable({
  providedIn: 'root'
})
export class AssignSubjectService {
  private apiUrl = 'http://localhost:8001/AcademApi/subjectReport/';
  private apiUrlPost = 'http://localhost:8001/AcademApi/subjectTeacherPeriod/';
  private apiUrlRA = 'http://localhost:8001/AcademApi/subjectRA/';
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
  getCompetenceById(competenceId: number): Observable<SubjectCompetence> {
    return this.httpClient.get<SubjectCompetence>(`http://localhost:8001/AcademApi/subjectCompetence/${competenceId}/`);
  }
  getAssignSubjectsByUserId(userId: number): Observable<AssignSubject[]> {
  return this.httpClient
    .get<{SubjectTeacherPeriods: any[]}>(`http://localhost:8001/AcademApi/teacher/${userId}/SubjectTeacherPeriod_asociated/`)
    .pipe(
      map(response =>
        response.SubjectTeacherPeriods.map(assignWrapper => {
          const assign = assignWrapper.SubjectTeacherPeriod;
          return {
            ...assign,
            displayName: `${assign.period.perSemester} - ${assign.subject.subjectName} - ${assign.teacher.first_name} ${assign.teacher.last_name}`
          } as AssignSubject;
        })
      )
    );
}

  deleteRA(raId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8001/AcademApi/subjectRA/${raId}/`);
  }
  createRA(ra: SubjectRA): Observable<SubjectRA> {   
    return this.httpClient.post<SubjectRA>(`${this.apiUrlRA}`, ra);
  }
}


