import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { AlertDialogService } from '../../../core/services/alert-dialog.service';

@Component({
  selector: 'app-alert-dialog',
  imports: [HlmAlertDialogImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css',
})
export class AlertDialog {
  private readonly alertDialogService = inject(AlertDialogService);
  readonly dialog = this.alertDialogService.dialog;
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');

  constructor() {
    effect(() => {
      const dialog = this.dialog();
      const trigger = this.trigger();

      if (dialog && trigger) {
        trigger.nativeElement.click();
      }
    });
  }

  confirm(ctx: any) {
    ctx.close();
    this.alertDialogService.confirm();
  }

  onClosed() {
    this.alertDialogService.clear();
  }
}
