import { Component } from '@angular/core';
import { ICountry } from '../../interfaces/by-capital.interface';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent {
  public countries: ICountry[] = [];
  constructor(private countriesService: CountriesService) {}

  public searchByCapital(term: string) {
    this.countriesService
      .searchCapital(term)
      .pipe(take(1))
      .subscribe({
        next: (value: ICountry[]) => {
          this.countries = value;
        },
      });
  }
}
