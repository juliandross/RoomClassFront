import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8001/users/patch/';

  constructor(private http: HttpClient) {}

    updateUser(id: number, user: User): Observable<User> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.put<User>(url, user);
    }
}