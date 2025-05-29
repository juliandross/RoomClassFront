import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/subject';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8000/AcademApi/subject/';
  constructor(private httpClient:HttpClient) { }
  getSubjects():Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.apiUrl);
    //Simulation of an API response with fake data
    /*const subjects: Subject[] = [
      { id: 1, name: 'Matemáticas', description:'Se aprende a sumar', credits: 4, semester: 1 },
      { id: 2, name: 'Física', description:'Se aprende a sumar', credits: 3, semester: 1 },
      { id: 3, name: 'Programación', description:'Se aprende a sumar', credits: 5, semester: 2 }
    ];
    return of(subjects);*/

  }
}
