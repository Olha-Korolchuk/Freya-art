import { Filters, IFilterFields } from './components/Filters/Filters';
import { Artworks } from './components/Artworks';
import { useGetFiltredArtsQuery } from '@/api/art';
import { Pagination } from '@/components';
import { useState } from 'react';
import { useDebounce } from '@/hooks';

export const AllWorks = () => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<IFilterFields>({ title: '' });
    const pageSize = 10;
    const debouncedValue = useDebounce<string>(filter.title, 1000);
    const { data, isLoading } = useGetFiltredArtsQuery({ page, title: debouncedValue, pageSize });

    return (
        <>
            <Filters filters={filter} setFilter={setFilter} />
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
