import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { AppButtonGeneral } from '../button/button';

export type TableColumnType = 'text' | 'action';

export interface TableColumn {
  label: string;
  key: string;
  type?: TableColumnType;
}

export interface TableAction {
  action: 'edit' | 'delete';
  row: any;
}

export interface TableAction {
  action: 'edit' | 'delete';
  row: any;
}

@Component({
  selector: 'app-table',
  imports: [HlmTableImports, AppButtonGeneral],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  columns = input<TableColumn[]>([]);
  data = input<any[]>([]);

  actionClick = output<TableAction>();
}
