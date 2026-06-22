export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta?: PaginationMeta | null;
  data: T | null;
}