import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewReviewDestination } from '../../interfaces/new-review-destination';
import { UpdateReviewDestination } from '../../interfaces/update-review-destination';
import { Review } from '../../interfaces/review';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) { }

  addReviewDestination(scoreNew: NewReviewDestination): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}`, scoreNew)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteReviewByUserIdAndDestinationId(userId: number, destinationId: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/${userId}/${destinationId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateReviewByUserIdAndDestinationId(userId: number, destinationId: number, updateReviewDestination: UpdateReviewDestination): Observable<Response> {
    return this.http.patch<Response>(`${this.apiUrl}/${userId}/${destinationId}`, updateReviewDestination)
      .pipe(
        catchError(this.handleError)
      );
  }

  getReviewByDestinationIdAndUserId(destinationId: number, userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${destinationId}/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getReviewsByDestinationId(destinationId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${destinationId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
