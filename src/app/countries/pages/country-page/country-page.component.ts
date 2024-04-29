import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/by-capital.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent implements OnInit {
  public country?: ICountry;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.searchCountry();
  }

  private searchCountry() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }: Params) => {
          return this.countriesService.searchCountryByAlphaCode(id);
        })
      )
      .subscribe({
        next: (country: ICountry | null) => {
          if (!country) {
            this.router.navigate(['']);
            return;
          }

          this.country = country;
        },
      });
  }
}
