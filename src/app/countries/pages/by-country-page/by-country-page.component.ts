import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../interfaces/by-capital.interface';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent implements OnInit {
  public countries: ICountry[] = [];
  public valueSearch?: string = '';

  constructor(private countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.initialCache();
  }

  private initialCache() {
    const { countries, term } = this.countriesService.cacheStore.byCountries;
    this.countries = countries;
    this.valueSearch = term;
  }

  public searchByCapital(term: string) {
    this.countriesService
      .searchCountry(term)
      .pipe(take(1))
      .subscribe({
        next: (value: ICountry[]) => {
          this.countries = value;
        },
      });
  }
}
