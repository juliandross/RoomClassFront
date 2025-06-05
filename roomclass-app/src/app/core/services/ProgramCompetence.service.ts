import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramCompetenceRAResponse } from '../../core/models/ProgramCompetence';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ProgramCompetenceService {
  private apiRAAsociatedUrl = 'http://localhost:8001/AcademApi/programCompetence/RA_asociated/';
  private deleteUrl = 'http://localhost:8001/AcademApi/programCompetence/';
  constructor(private http: HttpClient, private authService: AuthService) {}
  

  getProgramCompetences(): Observable<ProgramCompetenceRAResponse[]> {
    return this.http.get<ProgramCompetenceRAResponse[]>(this.apiRAAsociatedUrl);
  }

  
  deleteProgramCompetence(id: number): Observable<any> {
    const url = `${this.deleteUrl}${id}/`;
    return this.http.delete(url);
  }
}