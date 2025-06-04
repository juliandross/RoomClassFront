import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { SubjectCompetenceWrapper } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectCompetenceService {
  private apiUrl = 'http://localhost:8001/AcademApi/subjectTeacherPeriod/';
  constructor(private httpClient:HttpClient) { }
  getCompetencesBySubjectId(subjectId: number): Observable<SubjectCompetenceWrapper[]> {
    return this.httpClient.get<{ SubjectCompetences: SubjectCompetenceWrapper[] }>(this.apiUrl + subjectId + '/SubjectCompetence/RA/')
      .pipe(
        map(response => response.SubjectCompetences)
      );
}
}
