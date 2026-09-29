import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucidePencil, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

type ButtonType = 'add' | 'edit' | 'delete';

@Component({
  selector: 'app-button',
  imports: [HlmButtonImports, NgIcon],
  providers:[provideIcons({ lucidePlus, lucidePencil, lucideTrash })],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class AppButtonGeneral {
  type = input<ButtonType>('add');
}