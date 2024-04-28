import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtSearch')
  private inputSearch!: ElementRef<HTMLInputElement>;

  public emitValue() {
    this.onValue.emit(this.inputSearch.nativeElement.value);
  }
}
