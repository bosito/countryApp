import { ICountry } from './by-capital.interface';

export type TRegion = 'Africa' | 'America' | 'Asia' | 'Europe' | 'Oceania' | '';

export interface ICacheStore {
  byCapital: ITerm<string>;
  byCountries: ITerm<string>;
  byRegion: ITerm<TRegion>;
}

interface ITerm<T> {
  term?: T;
  countries: ICountry[];
}
