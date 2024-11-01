import { FC } from 'react';
import styled from 'styled-components';

interface ILoaderProps {
    bgColor?: string;
    height?: string;
}

const StyledWrapper = styled.div<ILoaderProps>`
    height: ${({ height }) => height || '100vh'};
    background-color: ${({ bgColor }) => bgColor || '#E4EDD4'};
    width: 100%;
    display: flex;
`;

const StyledLoader = styled.div`
    margin: auto;
    width: 5em;
    height: 5em;
    background: linear-gradient(-45deg, #fff 0%, #7e9e42 100%);
    animation: spin 3s infinite;
    &::before {
        content: '';
        z-index: -1;
        position: absolute;
        inset: 0;
        background: linear-gradient(-45deg, #fff 0%, #7e9e42 100%);
        transform: translate3d(0, 0, 0) scale(0.95);
        filter: blur(20px);
    }

    @keyframes spin {
        0% {
            transform: rotate(-45deg);
        }

        50% {
            transform: rotate(-360deg);
            border-radius: 50%;
        }

        100% {
            transform: rotate(-45deg);
        }
    }
`;

export const Loader: FC<ILoaderProps> = ({ bgColor, height }) => (
    <StyledWrapper bgColor={bgColor} height={height}>
        <StyledLoader />;
    </StyledWrapper>
);
