import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { AssignSubject } from '../models/assign-subject';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class AssignSubjectService {
  private apiUrl = 'http://localhost:8001/AcademApi/subjectReport/';
  constructor(private httpClient:HttpClient) { }
  getAssignSubjects(page: number = 1): Observable<AssignSubject[]> {
    const params = new HttpParams().set('page', page.toString());

    return this.httpClient
      .get<PaginatedResponse<AssignSubject>>(this.apiUrl, { params })
      .pipe(
        map(response =>
          response.results.map(assign => ({
            ...assign,
            displayName: `${assign.subject.subjectName} - ${assign.period.perSemester}`
          }))
        )
      );
  }

}
