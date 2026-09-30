import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucidePlus, lucidePencil, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

type ButtonType = 'add' | 'view' | 'edit' | 'delete';

@Component({
  selector: 'app-button',
  imports: [HlmButtonImports, NgIcon],
  providers:[provideIcons({ lucideEye, lucidePlus, lucidePencil, lucideTrash })],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class AppButtonGeneral {
  type = input<ButtonType>('add');
}