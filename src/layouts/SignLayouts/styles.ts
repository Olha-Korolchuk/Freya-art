import styled from 'styled-components';
import signBg from '@/assets/images/signBg.png';

export const StyledContainer = styled.div`
    background-image: ${`url(${signBg})`};
    height: 100vh;
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledBox = styled.div`
    border-radius: 16px;
    background-color: rgba(243, 252, 237, 0.65);
    backdrop-filter: blur(5px);
    border: 1px solid #fff;
    min-width: 600px;
`;
