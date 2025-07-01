import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
