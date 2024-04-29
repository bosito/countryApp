import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/by-capital.interface';
import { take } from 'rxjs';
import { TRegion } from '../../interfaces/cache-store,interface';
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent implements OnInit {
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

  public ngOnInit(): void {
    this.initialState();
  }

  private initialState() {
    const { countries, term } = this.countriesService.cacheStore.byRegion;

    this.countries = countries;
    this.currentRegion = term;
  }

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
