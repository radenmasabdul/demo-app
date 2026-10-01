import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';
import { AppButtonGeneral } from '../button/button';

type NavigationDirection = 'back' | 'next';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, NgIcon, AppButtonGeneral],
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

  isEditing = input(false);
  isSaving = input(false);

  editClick = output<void>();
  cancelClick = output<void>();
  saveClick = output<void>();

  isBack() {
    return this.direction() === 'back';
  }
}
