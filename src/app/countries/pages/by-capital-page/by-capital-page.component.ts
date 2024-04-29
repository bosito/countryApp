import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';
import { ICountry } from '../../interfaces/by-capital.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: ICountry[] = [];
  public valueSearch?: string = '';

  constructor(private countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.initialCacheState();
  }

  private initialCacheState() {
    const { countries, term } = this.countriesService.cacheStore.byCapital;
    this.valueSearch = term;
    this.countries = countries;
  }

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
