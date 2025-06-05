import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RAProgram } from '../models/RAProgram';
@Injectable({ providedIn: 'root' })
export class ProgramRAService {
  private getProgramRAUrl = 'http://localhost:8001/AcademApi/programRA/';
  private deleteUrl = 'http://localhost:8001/AcademApi/programRA/';
  private createUrl = 'http://localhost:8001/AcademApi/programRA/';
  private patchUrl = 'http://localhost:8001/AcademApi/programRA/';

  constructor(private http: HttpClient) {}

    getProgramRA(): Observable<RAProgram[]> {
        return this.http.get<any[]>(this.getProgramRAUrl);
    }

    createProgramRA(programRA: RAProgram): Observable<any> {
        return this.http.post<any>(this.createUrl, programRA);
    }

    deleteProgramRA(id: number): Observable<any> {
        const url = `${this.deleteUrl}${id}/`;
        return this.http.delete(url);
    }

    updateProgramRA(id: number, programRA: RAProgram): Observable<any> {
        const url = `${this.patchUrl}${id}/`;
        return this.http.patch<any>(url, programRA);
    }
}