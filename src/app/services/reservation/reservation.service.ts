import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reservation } from '../../interfaces/reservation';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservation`;

  constructor(private http: HttpClient) { }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllReservationsByUserId(userId: number): Observable<Reservation[]> {
    const url = `${this.apiUrl}/${userId}/user`;
    return this.http.get<Reservation[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateReservationStatusToPaid(reservationId: number): Observable<Reservation> {
    const url = `${this.apiUrl}/${reservationId}/status`;
    return this.http.patch<Reservation>(url, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDestinationFromReservation(reservationId: number, destinationId: number): Observable<any> {
    const url = `${this.apiUrl}/${reservationId}/destinations/${destinationId}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addDestinationToReservation(reservationId: number, destinationId: number): Observable<any> {
    const url = `${this.apiUrl}/${reservationId}/addDestination/${destinationId}`;
    return this.http.post(url, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteReservation(reservationId: number): Observable<any> {
    const url = `${this.apiUrl}/${reservationId}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
