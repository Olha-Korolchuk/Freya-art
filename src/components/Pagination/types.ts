export interface IPagination {
  onPageChange: (page: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
