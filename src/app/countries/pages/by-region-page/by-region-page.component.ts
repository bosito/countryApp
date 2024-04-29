import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/by-capital.interface';
import { take } from 'rxjs';

type TRegion = 'Africa' | 'America' | 'Asia' | 'Europe' | 'Oceania';
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent {
  public countries: ICountry[] = [];
  public isLoading = true;
  public regions: TRegion[] = [
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public currentRegion?: TRegion;

  constructor(private countriesService: CountriesService) {}

  public searchByCapital(term: TRegion) {
    this.currentRegion = term;
    this.countriesService
      .searchRegion(term)
      .pipe(take(1))
      .subscribe({
        next: (value: ICountry[]) => {
          this.isLoading = false;
          this.countries = value;
        },
      });
  }
}
