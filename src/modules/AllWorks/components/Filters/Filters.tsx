import React from 'react';
import { Search } from './components/Search';
import { Type } from './components/Type';
import { Genre } from './components/Genre';
import { StyledContainer } from './styles';

export const Filters = () => {
    return (
        <StyledContainer>
            <Search />
            <Type />
            <Genre />
        </StyledContainer>
    );
};
