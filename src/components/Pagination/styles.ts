import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding-bottom: 8px;
    @media screen and (max-width: 540px) {
        gap: 16px;
    }
`;

export const Range = styled(Wrapper)`
    gap: 24px;
    @media screen and (max-width: 540px) {
        gap: 20px;
    }
`;

export const ArrowButtonPrev = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: relative;
    border: none;
    background-color: #50b253;
    transform: rotate(90deg);
    transition: all 0.4s ease-in-out;
    &:disabled {
        filter: opacity(0.1);
        cursor: default;
    }
    &:not([disabled]) {
        &:active {
            transform: scale(0.8) rotate(90deg);
        }
    }

    img {
        border-radius: 50%;
        height: 32px;
        width: 32px;
        padding: 9px;
    }
`;

export const ArrowButtonNext = styled(ArrowButtonPrev)`
    transform: rotate(270deg);
    &:not([disabled]) {
        &:active {
            transform: scale(0.8) rotate(270deg);
        }
    }
`;

export const ButtonPage = styled.button<{ isActive: boolean }>`
    color: ${({ isActive }) => (isActive ? '#191919' : '#ccc')};
    font-size: 16px;
    padding: 4px 12px;
    background-color: #deffdb;
    border: none;
    border-radius: 4px;
    font-weight: 600;
`;
