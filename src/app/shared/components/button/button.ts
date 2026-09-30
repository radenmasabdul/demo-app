import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucidePlus, lucidePencil, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

type ButtonType = 'add' | 'view' | 'edit' | 'delete' | 'save' | 'cancel';

@Component({
  selector: 'app-button',
  imports: [HlmButtonImports, NgIcon, HlmDialogImports],
  providers: [provideIcons({ lucideEye, lucidePlus, lucidePencil, lucideTrash })],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class AppButtonGeneral {
  type = input<ButtonType>('add');
  isDialogTrigger = input(false);
}