export interface IPagination {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
export type TPaginationItems = Array<string | number>;
export type TUsePagination = (date: IPagination) => TPaginationItems;
