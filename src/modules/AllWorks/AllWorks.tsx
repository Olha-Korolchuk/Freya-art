import { useGetFilteredArtsQuery } from '@/api/art';
import { Pagination } from '@/components';
import { Loader } from '@/components/Loader';
import { useDebounce } from '@/hooks';
import { useState } from 'react';
import { Artworks } from './components/Artworks';
import { Filters, IFilterFields } from './components/Filters/Filters';
import styled from 'styled-components';

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #e4edd4;
    padding-top: 24px;
    gap: 2px;
`;

export const AllWorks = () => {
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const [filter, setFilter] = useState<IFilterFields>({ title: '', genre: [], type: [] });
    const debouncedFilter = useDebounce<IFilterFields>(filter, 1000);
    const { data, isLoading } = useGetFilteredArtsQuery({ ...debouncedFilter, page, pageSize });

    return (
        <StyledContainer>
            <Filters filters={filter} setFilter={setFilter} />
            {isLoading ? <Loader height={'80vh'} /> : <Artworks arts={data?.arts || []} />}
            <Pagination
                currentPage={page}
                onPageChange={(value) => setPage(value)}
                pageSize={pageSize}
                totalCount={data?.total || 0}
            />
        </StyledContainer>
    );
};
