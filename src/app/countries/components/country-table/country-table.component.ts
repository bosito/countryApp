import { Component, Input } from '@angular/core';
import { ICountry } from '../../interfaces/by-capital.interface';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css'],
})
export class CountryTableComponent {
  @Input()
  public counties: ICountry[] = [];
}
