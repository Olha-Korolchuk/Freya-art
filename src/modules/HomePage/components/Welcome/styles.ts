import styled from 'styled-components';

export const StyledContainer = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    background: rgb(255, 255, 255);
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(157, 189, 97, 1) 50%,
        rgba(255, 255, 255, 1) 100%
    );
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledCircle = styled.div`
    width: 254px;
    height: 254px;
    background: rgb(255, 255, 255);
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(228, 237, 212, 1) 35%,
        rgba(157, 189, 97, 1) 75%,
        rgba(126, 158, 66, 1) 100%
    );
    border-radius: 100%;
`;

export const StyledLine = styled.div`
    width: 1px;
    height: 153px;
    background-color: #000;
    position: absolute;
    bottom: 0;
    left: 50%;
`;

export const StyledWelcome = styled.div`
    position: absolute;
    width: 390px;
    top: 242px;
    z-index: 2;
`;

export const StyledFreya = styled.div`
    font-size: 100px;
    text-align: left;
    font-weight: 400;
`;

export const StyledArt = styled.div`
    font-size: 100px;
    text-align: right;
    font-weight: 400;
`;
