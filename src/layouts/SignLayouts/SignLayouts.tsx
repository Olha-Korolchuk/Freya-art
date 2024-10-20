import { Outlet } from 'react-router-dom';
import React from 'react';
import { StyledBox, StyledContainer } from './styles';

export const SignLayout = () => {
    return (
        <div>
            <StyledContainer>
                <StyledBox>
                    <Outlet />
                </StyledBox>
            </StyledContainer>
        </div>
    );
};
