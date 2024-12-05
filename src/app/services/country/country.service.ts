import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../../interfaces/country';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = `${environment.apiUrl}/country`; // Cambia esta URL por la que corresponda en tu backend

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }
}
