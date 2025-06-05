import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { SubjectCompetenceWrapper } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectCompetenceService {
  private apiUrl = 'http://localhost:8001/AcademApi/subjectTeacherPeriod/';
  private apiCompetencesUrl = 'http://localhost:8001/AcademApi/subjectCompetence/';
  constructor(private httpClient:HttpClient) { }
  getCompetencesBySubjectId(subjectId: number): Observable<SubjectCompetenceWrapper[]> {
    return this.httpClient.get<{ SubjectCompetences: SubjectCompetenceWrapper[] }>(this.apiUrl + subjectId + '/SubjectCompetence/RA/')
      .pipe(
        map(response => response.SubjectCompetences)
      );
  }

  createSubjectCompetence(
    compDescription: string,
    compLevel: string,
    programCompetence: number,
    subjectTeacherPeriod: number
  ): Observable<SubjectCompetenceWrapper> {
    const body = {
      compDescription,
      compLevel,
      programCompetence,
      subjectTeacherPeriod
    };
    return this.httpClient.post<SubjectCompetenceWrapper>(this.apiCompetencesUrl, body);
  }
  deleteSubjectCompetence(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiCompetencesUrl}${id}/`);
  }
  
  updateSubjectCompetence(
    id: number,
    compDescription: string,
    compLevel: string,
    programCompetence: number,
    subjectTeacherPeriod: number
  ): Observable<SubjectCompetenceWrapper> {
    const body = {
      compDescription,
      compLevel,
      programCompetence,
      subjectTeacherPeriod
    };
    const url = `${this.apiCompetencesUrl}${id}/`;
    return this.httpClient.patch<SubjectCompetenceWrapper>(url, body);
  }
}
