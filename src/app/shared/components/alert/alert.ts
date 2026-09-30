import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCircleAlert,
  lucideCircleCheck,
  lucideInfo,
  lucideTriangleAlert,
} from '@ng-icons/lucide';
import { AlertService, AlertVariant } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alert',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideCircleCheck,
      lucideCircleAlert,
      lucideInfo,
      lucideTriangleAlert,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  private readonly alertService = inject(AlertService);

  readonly alert = this.alertService.alert;

  getIcon(variant: AlertVariant) {
    switch (variant) {
      case 'success':
        return 'lucideCircleCheck';

      case 'error':
        return 'lucideCircleAlert';

      case 'warning':
        return 'lucideTriangleAlert';

      case 'info':
        return 'lucideInfo';
    }
  }

  getClass(variant: AlertVariant) {
    switch (variant) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50 text-emerald-800';

      case 'error':
        return 'border-rose-200 bg-rose-50 text-rose-800';

      case 'warning':
        return 'border-amber-200 bg-amber-50 text-amber-800';

      case 'info':
        return 'border-sky-200 bg-sky-50 text-sky-800';
    }
  }

  close() {
    this.alertService.clear();
  }
}
