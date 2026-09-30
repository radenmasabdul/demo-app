import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { AppButtonGeneral } from '../button/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

export type DialogInputType =
  'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' |
  'select' | 'checkbox' | 'radio' | 'date' | 'textarea' | 'file' | 'tel';

export interface SelectOption {
  label: string;
  value: any;
}

export interface InputConfig {
  key: string;
  label: string;
  type: DialogInputType;
  placeholder?: string;
  options?: SelectOption[];
}

@Component({
  selector: 'app-dialog',
  imports: [
    HlmDialogImports,
    HlmFieldImports,
    HlmInputImports,
    AppButtonGeneral,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  title = input<string>('Create New Item');
  inputs = input<InputConfig[]>([]);
  formGroup = input.required<FormGroup>();
  submitted = signal(false);

  onSave = output<void>();
  onCancel = output<void>();

  submit(ctx: { close: () => void }) {
    this.submitted.set(true);

    const form = this.formGroup();

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.onSave.emit();
    ctx.close();
  }

  cancel(ctx: { close: () => void }) {
    this.submitted.set(false);
    this.formGroup().reset();
    this.onCancel.emit();
    ctx.close();
  }
}
