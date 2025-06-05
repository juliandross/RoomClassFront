import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { create } from "domain";
import { CompetenceProgramSubject } from "../models/competence-program-subject";

@Injectable({ providedIn: 'root' })
export class CompetenceProgramSubjectService {
    private urlApi = 'http://localhost:8001/AcademApi/competenceProgramSubject/';

    constructor(private httpClient: HttpClient, private authService: AuthService) {}
   
    postCompetenceProgramSubject(programCompetence: number, subject: number): Observable<CompetenceProgramSubject> {
        const body = { programCompetence, subject };
        return this.httpClient.post<CompetenceProgramSubject>(this.urlApi, body);
    }
}
