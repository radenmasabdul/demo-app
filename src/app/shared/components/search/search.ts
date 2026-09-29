import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-search',
  imports: [HlmInputImports, HlmFieldImports, HlmButtonImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {}
