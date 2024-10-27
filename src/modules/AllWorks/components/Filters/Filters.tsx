import { Type } from './components/Type';
import { Genre } from './components/Genre';
import { StyledContainer } from './styles';
import { Dispatch, FC, SetStateAction } from 'react';
import { StyledInput } from './components/styles';

export type TFilterField = 'title';

export interface IFilterFields {
    title: string;
}

export interface IFilterFieldsProps {
    filters: IFilterFields;
    setFilter: Dispatch<SetStateAction<IFilterFields>>;
}

export const Filters: FC<IFilterFieldsProps> = ({ filters, setFilter }) => {
    const handleChange = (value: string, key: TFilterField) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <StyledContainer>
            <StyledInput
                placeholder="Search..."
                value={filters.title}
                onChange={(e) => handleChange(e.target.value, 'title')}
            />
            <Type />
            <Genre />
        </StyledContainer>
    );
};
