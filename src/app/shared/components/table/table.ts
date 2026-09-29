import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { AppButtonGeneral } from '../button/button';
import { Pagination } from '../pagination/pagination';

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

@Component({
  selector: 'app-table',
  imports: [HlmTableImports, AppButtonGeneral, Pagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  columns = input<TableColumn[]>([]);
  data = input<any[]>([]);

  page = input(0);
  pageSize = input(10);
  totalItems = input(0);

  actionClick = output<TableAction>();

  pageChange = output<number>();
  pageSizeChange = output<number>();
}
