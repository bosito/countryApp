import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/by-capital.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent {
  public countries: ICountry[] = [];
  public isLoading = true;
  constructor(private countriesService: CountriesService) {}

  public searchByCapital(term: string) {
    this.countriesService
      .searchCapital(term)
      .pipe(take(1))
      .subscribe({
        next: (value: ICountry[]) => {
          this.isLoading = false;
          this.countries = value;
        },
      });
  }
}
