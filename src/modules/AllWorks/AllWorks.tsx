import { useGetFilteredArtsQuery } from '@/api/art';
import { Pagination } from '@/components';
import { Loader } from '@/components/Loader';
import { useDebounce } from '@/hooks';
import { useState } from 'react';
import { Artworks } from './components/Artworks';
import { Filters, IFilterFields } from './components/Filters/Filters';

export const AllWorks = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [filter, setFilter] = useState<IFilterFields>({ title: '', genre: [], type: [] });
    const debouncedFilter = useDebounce<IFilterFields>(filter, 1000);
    const { data, isLoading } = useGetFilteredArtsQuery({ ...debouncedFilter, page, pageSize });

    return (
        <>
            <Filters filters={filter} setFilter={setFilter} />
            {isLoading ? <Loader bgColor={'#E4EDD4'} height={'80vh'} /> : <Artworks arts={data?.arts || []} />}
            <Pagination
                currentPage={page}
                onPageChange={(value) => setPage(value)}
                pageSize={pageSize}
                totalCount={data?.total || 0}
            />
        </>
    );
};
