import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
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

  public searchCountryByAlphaCode(code: string): Observable<ICountry | null> {
    return this.http.get<ICountry[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }
}
