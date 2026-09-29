import { Component, input, output } from '@angular/core';
import { HlmNumberedPagination } from '@spartan-ng/helm/pagination';

@Component({
  selector: 'app-pagination',
  imports: [HlmNumberedPagination],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  page = input(0);
  pageSize = input(10);
  totalItems = input(0);

  pageChange = output<number>();
  pageSizeChange = output<number>();
}
