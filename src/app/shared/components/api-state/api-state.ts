import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from '../skeleton/skeleton';

@Component({
  selector: 'app-api-state',
  imports: [Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-state.html',
  styleUrl: './api-state.css',
})
export class ApiState {
  isLoading = input(false);
  isError = input(false);
  isEmpty = input(false);

  skeletonCount = input(5);

  errorTitle = input('Failed to load data.');
  errorDescription = input('Check your connection and try again.');

  emptyTitle = input('No data found');
  emptyDescription = input('Try a different search term.');
}
