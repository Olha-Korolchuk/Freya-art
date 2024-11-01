import { useMemo } from 'react';
import { TPaginationItems, TUsePagination } from './types';
export const DOTS = '...';

export const usePagination: TUsePagination = (data) => {
  const { currentPage, pageSize, totalCount } = data;

  const paginationRange = useMemo<TPaginationItems>(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // pages count = neighboring index to the current index + first index + last index + current index + 2*DOTS
    const totalPageNumbers = 6;
    const itemCount = 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // the left index from the current page index
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    // the right index from the current page index
    const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    // 1 2 3 4 5 ... last
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftRange = range(1, itemCount);

      return [...leftRange, DOTS, totalPageCount];
    }
    // 1 ... last-4 last-3 last-2 last-1 last
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightRange = range(totalPageCount - itemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    // 1 ... n-1 n n+1 ... last
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [currentPage, pageSize, totalCount]);

  return paginationRange;
};

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
