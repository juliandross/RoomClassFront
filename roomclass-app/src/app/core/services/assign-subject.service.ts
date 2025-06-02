import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { AssignSubject } from '../models/assign-subject';

@Injectable({
  providedIn: 'root'
})
export class AssignSubjectService {
  private apiUrl = 'http://localhost:8001/AcademApi/xxxxxx/';
  constructor(private httpClient:HttpClient) { }
  getAssignSubjects(): Observable<AssignSubject[]> {
    return this.httpClient.get<AssignSubject[]>(this.apiUrl).pipe(
      map(assignments => 
        assignments.map(as => ({
          ...as,
          displayName: `${as.subject.subjectName} - ${as.period.perSemester}`
        }))
      )
    );
  }

}
