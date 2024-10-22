import styled from 'styled-components';

export const StyledContainer = styled.div`
    padding-inline: 38px;
    height: 335px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(243, 252, 237);
    background: linear-gradient(90deg, rgba(243, 252, 237, 1) 0%, rgba(157, 189, 97, 1) 100%);
`;

export const StyledText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StyledName = styled.h1`
    font-size: 60px;
`;

export const StyledEmail = styled.h2`
    font-size: 30px;
`;

export const StyledImg = styled.img`
    width: 274px;
    height: 274px;
    object-fit: cover;
    object-position: center 80%;
    border-radius: 100%;
    border: 1px solid #000;
`;
