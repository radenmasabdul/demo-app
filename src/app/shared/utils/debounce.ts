import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export function useDebounce<T>(source$: Observable<T>, delay = 500): Observable<T> {
  return source$.pipe(debounceTime(delay), distinctUntilChanged());
}
