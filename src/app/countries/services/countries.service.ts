import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { ICountry } from '../interfaces/by-capital.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  private getCountriesRequest(url: string) {
    return this.http.get<ICountry[]>(url).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
      delay(2000)
    );
  }

  public searchCapital(term: string): Observable<ICountry[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);
  }

  public searchCountry(term: string): Observable<ICountry[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url);
  }

  public searchRegion(term: string): Observable<ICountry[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url);
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
