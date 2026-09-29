import { Component, input } from '@angular/core';
import { HlmSelectImports } from '@spartan-ng/helm/select';

export interface SelectItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  imports: [HlmSelectImports],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  items = input<SelectItem[]>([]);

  placeholder = input('Select...');
  label = input<string>();

  itemToString = (value: string) => this.items().find((item) => item.value === value)?.label || '';
}
