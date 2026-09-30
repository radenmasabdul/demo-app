import { Injectable, signal } from '@angular/core';

export interface AlertDialogData {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  readonly dialog = signal<AlertDialogData | null>(null);

  private resolveConfirm: (() => void) | null = null;

  open(data: AlertDialogData, onConfirm: () => void) {
    this.resolveConfirm = onConfirm;
    this.dialog.set(data);
  }

  confirm() {
    const callback = this.resolveConfirm;
    this.dialog.set(null);
    this.resolveConfirm = null;
    callback?.();
  }

  clear() {
    this.dialog.set(null);
    this.resolveConfirm = null;
  }
}
