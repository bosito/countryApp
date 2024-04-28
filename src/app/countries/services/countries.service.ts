import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ICountry } from '../interfaces/by-capital.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  public searchCapital(term: string): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.apiUrl}/capital/${term}`).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  public searchCountry(term: string): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.apiUrl}/name/${term}`).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  public searchRegion(term: string): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.apiUrl}/region/${term}`).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }
}
