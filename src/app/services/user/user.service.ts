import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.apiUrl+"/user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}user/${userRequest.userId}`, userRequest).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error('Backend retornó el código de estado:', error.status);
    }
    return throwError('Algo falló. Por favor intente nuevamente.');
  }
}
