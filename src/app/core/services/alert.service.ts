import { Injectable, signal } from '@angular/core';

export type AlertVariant = 'success' | 'error' | 'info' | 'warning';

export interface AlertData {
  variant: AlertVariant;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  readonly alert = signal<AlertData | null>(null);

  success(description: string, title = 'Success') {
    this.alert.set({
      variant: 'success',
      title,
      description,
    });
  }

  error(description: string, title = 'Error') {
    this.alert.set({
      variant: 'error',
      title,
      description,
    });
  }

  info(description: string, title = 'Info') {
    this.alert.set({
      variant: 'info',
      title,
      description,
    });
  }

  warning(description: string, title = 'Warning') {
    this.alert.set({
      variant: 'warning',
      title,
      description,
    });
  }

  clear() {
    this.alert.set(null);
  }
}
