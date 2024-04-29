import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { ICountry } from '../interfaces/by-capital.interface';
import { ICacheStore, TRegion } from '../interfaces/cache-store,interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: ICacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { term: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadLocalStorage() {
    const cacheByLocalStorage = localStorage.getItem('cacheStore');
    if (!cacheByLocalStorage) {
      return;
    }

    const cacheByLocalStoragePase = JSON.parse(cacheByLocalStorage);
    this.cacheStore = cacheByLocalStoragePase;
  }

  private getCountriesRequest(url: string) {
    return this.http.get<ICountry[]>(url).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  public searchCapital(term: string): Observable<ICountry[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries: ICountry[]) => {
        this.cacheStore.byCapital = { countries, term };
      }),
      tap(() => this.saveLocalStorage())
    );
  }

  public searchCountry(term: string): Observable<ICountry[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries: ICountry[]) => {
        this.cacheStore.byCountries = { countries, term };
      }),
      tap(() => this.saveLocalStorage())
    );
  }

  public searchRegion(term: TRegion): Observable<ICountry[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries: ICountry[]) => {
        this.cacheStore.byRegion = { countries, term };
      }),
      tap(() => this.saveLocalStorage())
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
