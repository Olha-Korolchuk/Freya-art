import { Filters, IFilterFields } from './components/Filters/Filters';
import { Artworks } from './components/Artworks';
import { Pagination } from '@/components';
import { useState } from 'react';
import { useDebounce } from '@/hooks';
import { useGetFilteredArtsQuery } from '@/api/art';

export const AllWorks = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [filter, setFilter] = useState<IFilterFields>({ title: '', genre: [], type: [] });
    const debouncedFilter = useDebounce<IFilterFields>(filter, 1000);
    const { data, isLoading } = useGetFilteredArtsQuery({ ...debouncedFilter, page, pageSize });

    return (
        <>
            <Filters filters={filter} setFilter={setFilter} />
            {/* "TODO: Provide Loader" */}
            {isLoading ? <>Loading...</> : <Artworks arts={data?.arts || []} />}
            <Pagination
                currentPage={page}
                onPageChange={(value) => setPage(value)}
                pageSize={pageSize}
                totalCount={data?.total || 0}
            />
        </>
    );
};
