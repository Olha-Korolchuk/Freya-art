import arrowImage from '@/assets/images/icons/arrow-down.svg';

import { FC } from 'react';
import { ArrowButtonNext, ArrowButtonPrev, ButtonPage, Range, Wrapper } from './styles';

import { IPagination } from './types';
import { DOTS, usePagination } from '@/hooks';
const Pagination: FC<IPagination> = (props) => {
    const { currentPage, onPageChange, pageSize, totalCount } = props;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        pageSize,
    });

    let lastPage = paginationRange[paginationRange.length - 1];

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const renderPaginationItems = () => {
        return paginationRange.map((pageNumber, id) => {
            if (pageNumber === DOTS) {
                return (
                    <ButtonPage isActive={false} key={id}>
                        {DOTS}
                    </ButtonPage>
                );
            }
            return (
                <ButtonPage
                    isActive={currentPage === pageNumber}
                    key={id}
                    onClick={() => {
                        if (typeof pageNumber === 'number') {
                            onPageChange(pageNumber);
                        }
                    }}
                >
                    {pageNumber}
                </ButtonPage>
            );
        });
    };

    return (
        <Wrapper>
            <ArrowButtonPrev onClick={onPrevious} disabled={currentPage === 1}>
                <img src={arrowImage} alt="arrow-back" />
            </ArrowButtonPrev>
            <Range>{renderPaginationItems()}</Range>
            <ArrowButtonNext onClick={onNext} disabled={currentPage === lastPage}>
                <img src={arrowImage} alt="arrow-next" />
            </ArrowButtonNext>
        </Wrapper>
    );
};

export default Pagination;
