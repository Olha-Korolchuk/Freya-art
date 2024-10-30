import styled from 'styled-components';

export const StyledContainer = styled.div`
    padding: 38px;
    background-color: #e4edd4;
    position: relative;
`;

export const StyledArt = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-around;
    gap: 38px;
`;

export const StyledContent = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const StyledTexts = styled.div`
    display: flex;
    gap: 14px;
    flex-direction: column;
`;
export const StyledBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

export const StyledCategory = styled.div`
    display: flex;
    gap: 38px;
`;

export const StyledImg = styled.img`
    border-radius: 16px;
    width: 533px;
    height: 533px;
    object-fit: cover;
    box-shadow:
        rgba(14, 30, 37, 0.32) 0px 2px 4px 0px,
        rgba(14, 30, 37, 0.42) 0px 2px 16px 0px;
`;

export const StyledIcon = styled.img``;

export const StyledTitle = styled.h1`
    font-size: 40px;
`;

export const StyledAuthor = styled.h2`
    font-size: 24px;
    cursor: pointer;
`;

export const StyledDescription = styled.p`
    font-size: 20px;
`;

export const StyledInfo = styled.h3`
    font-size: 30px;
    display: flex;
    gap: 5px;
    align-items: end;
`;

export const StyledUpdate = styled.button`
    cursor: pointer;
    background-color: #9dbd61;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 5px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
`;

export const StyledDelete = styled(StyledUpdate)`
    background-color: #bd6161;
`;

export const StyledBGImg = styled.img`
    position: absolute;
    width: 100%;
    object-fit: cover;
    object-position: top;
    height: 100%;
    left: 0;
    bottom: 0;
`;

export const StyledExit = styled.button`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
`;

export const StyledExitImg = styled.img``;

export const StyledTag = styled.div`
    background-color: #d4d4d4;
    padding: 4px 10px;
    font-size: 16px;
    border-radius: 8px;
`;
