import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { Period } from "../models/period";

@Injectable({ providedIn: 'root' })
export class PeriodService {
    private apiUrl = 'http://localhost:8001/AcademApi/period/';

    constructor(private http: HttpClient, private authService: AuthService) {}

    getPeriods(): Observable<Period[]> {
        return this.http.get<Period[]>(this.apiUrl)
    }

    getPeriodById(id: number): Observable<Period> {
        return this.http.get<Period>(`${this.apiUrl}${id}/`);
    }
}
