import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';
import { ICountry } from '../../interfaces/by-capital.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent {
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
