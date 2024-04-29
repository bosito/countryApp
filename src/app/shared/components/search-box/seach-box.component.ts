import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime, take } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debounce: Subject<string> = new Subject();
  private debounceSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtSearch')
  private inputSearch!: ElementRef<HTMLInputElement>;

  public ngOnInit(): void {
    this.subscribeDebounceValue();
  }

  public ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe();
  }

  // this code is old
  public emitValue() {
    this.onValue.emit(this.inputSearch.nativeElement.value);
  }

  private subscribeDebounceValue() {
    this.debounceSubscription = this.debounce
      .pipe(debounceTime(1000))
      .subscribe({
        next: (value: string) => {
          this.onValue.emit(value);
        },
      });
  }

  public onKeysPress() {
    this.debounce.next(this.inputSearch.nativeElement.value);
  }
}
