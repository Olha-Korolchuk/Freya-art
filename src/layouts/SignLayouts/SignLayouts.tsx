import { Outlet } from 'react-router-dom';

import { StyledBox, StyledContainer } from './styles';

export const SignLayout = () => (
    <StyledContainer>
        <StyledBox>
            <Outlet />
        </StyledBox>
    </StyledContainer>
);
