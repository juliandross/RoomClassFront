import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramCompetenceRAResponse } from '../../core/models/ProgramCompetence';

@Injectable({ providedIn: 'root' })
export class ProgramCompetenceService {
  private apiRAAsociatedUrl = 'http://localhost:8001/AcademApi/programCompetence/RA_asociated/';
  private deleteUrl = 'http://localhost:8001/AcademApi/programCompetence/';
  private createUrl = 'http://localhost:8001/AcademApi/programCompetence/';
  
  constructor(private http: HttpClient) {}
  

  getProgramCompetences(): Observable<ProgramCompetenceRAResponse[]> {
    return this.http.get<ProgramCompetenceRAResponse[]>(this.apiRAAsociatedUrl);
  }

  createProgramCompetence(programCompetence: ProgramCompetenceRAResponse): Observable<ProgramCompetenceRAResponse> {
    return this.http.post<ProgramCompetenceRAResponse>(this.createUrl, programCompetence);
  }
  
  deleteProgramCompetence(id: number): Observable<any> {
    const url = `${this.deleteUrl}${id}/`;
    return this.http.delete(url);
  }
}