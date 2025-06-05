import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { AssignSubject } from '../models/assign-subject';
import { PaginatedResponse } from '../models/paginated-response';
import { SubjectRA } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class AssignSubjectService {
  private apiUrl = 'http://localhost:8001/AcademApi/subjectReport/';
  private baseUrl = 'http://localhost:8001/AcademApi/';
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
  getRAById(id: number): Observable<SubjectRA> {
    return this.httpClient.get<any>(`${this.baseUrl}subjectRA/${id}/`);
  }

}
