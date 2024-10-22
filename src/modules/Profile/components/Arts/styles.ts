import styled from 'styled-components';
import { TImgProps } from './types';

export const StyledContainer = styled.div`
    padding: 38px;
    display: flex;
    flex-direction: column;
    gap: 38px;
    background-color: #e4edd4;
`;
export const StyledContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledText = styled.h2`
    font-size: 40px;
`;

export const StyledButton = styled.button`
    border-radius: 100%;
    width: 30px;
    height: 30px;
    border: none;
    background-color: #9dbd61;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const StyledImg = styled.img``;

export const StyledLine = styled.hr``;

export const StyledArts = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 38px;
`;

export const StyledArt = styled.div<TImgProps>`
    border-radius: 16px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 330px;
    height: 506px;
    background-image: ${({ path }) => `url('${path}')`};
`;

export const StyledNoArts = styled.div`
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledCard = styled.div`
    position: relative;
`;

export const StyledContainerTitle = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    padding: 10px;
    text-align: center;
    background: rgb(0, 0, 0);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

export const StyledTitle = styled.h3`
    font-size: 40px;
`;
