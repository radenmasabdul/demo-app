import { ChangeDetectionStrategy, Component, DestroyRef, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { Subject } from 'rxjs';
import { useDebounce } from '../../utils/debounce';

@Component({
  selector: 'app-search',
  imports: [HlmInputImports, HlmFieldImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  public readonly searchChange = output<string>();

  constructor() {
    useDebounce(this.searchSubject, 500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.searchChange.emit(value);
      });
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }
}
