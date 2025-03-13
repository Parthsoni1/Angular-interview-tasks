import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, Observable } from 'rxjs';
import { User } from '.././models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private http = inject(HttpClient);


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.map(user => ({ ...user, name: user.name.toUpperCase() })))
    );
  }




  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); 
    throw error;
  }

}
