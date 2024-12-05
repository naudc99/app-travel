import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Destination } from '../../interfaces/destination';
import { NewDestination } from '../../interfaces/new-destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private apiUrl = `${environment.apiUrl}/destination`; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  }

  getDestinationById(id: number): Observable<Destination> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Destination>(url);
  }

  createDestinationWithImage(newDestination: FormData): Observable<Destination> {
    return this.http.post<Destination>(this.apiUrl, newDestination);
  }

  updateDestination(id: number, updatedDestination: NewDestination): Observable<Destination> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Destination>(url, updatedDestination);
  }

  deleteDestination(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}