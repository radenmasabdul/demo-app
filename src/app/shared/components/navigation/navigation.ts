import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';

type NavigationDirection = 'back' | 'next';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideArrowRight,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  direction = input<NavigationDirection>('back');
  to = input.required<string>();
  label = input.required<string>();

  isBack() {
    return this.direction() === 'back';
  }
}
