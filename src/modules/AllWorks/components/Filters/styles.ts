import styled from 'styled-components';

export const StyledContainer = styled.div`
    padding: 0 38px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    position: relative;
    z-index: 4;
`;

export const StyledInput = styled.input`
    border-radius: 8px;
    border: 1px solid #cccccc;
    padding: 16px 28px;
    font-size: 20px;
    height: 56px;
    width: 100%;
`;
