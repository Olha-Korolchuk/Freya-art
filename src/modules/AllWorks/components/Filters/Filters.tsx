import { StyledContainer, StyledInput } from './styles';
import { Dispatch, FC, SetStateAction } from 'react';
import { genreOptions, typeOptions } from '@/constants/select';
import { FormMultiSelect } from '@/ui-library/inputs/FormMultiSelect';

export type TFilterField = 'title' | 'type' | 'genre';

export interface IFilterFields {
    title: string;
    genre: string[];
    type: string[];
}

export interface IFilterFieldsProps {
    filters: IFilterFields;
    setFilter: Dispatch<SetStateAction<IFilterFields>>;
}


export const Filters: FC<IFilterFieldsProps> = ({ filters, setFilter }) => {
    const handleChange = (value: string[] | string, key: TFilterField) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <StyledContainer>
            <StyledInput
                placeholder="Search..."
                value={filters.title}
                onChange={(e) => handleChange(e.target.value, 'title')}
            />
            <FormMultiSelect
                value={typeOptions.filter((option) => filters.type?.includes(option.value))}
                options={typeOptions}
                placeholder="Select Types"
                onChange={(values) => handleChange(values, 'type')}
            />
            <FormMultiSelect
                value={genreOptions.filter((option) => filters.genre?.includes(option.value))}
                options={genreOptions}
                placeholder="Select Genres"
                onChange={(values) => handleChange(values, 'genre')}
            />
        </StyledContainer>
    );
};
