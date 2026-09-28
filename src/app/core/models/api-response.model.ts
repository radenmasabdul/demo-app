export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  timestamp: string;
}