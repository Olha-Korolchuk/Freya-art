import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import styled from 'styled-components';

const StyledMain = styled.main`
    padding-top: 80px;
`;

export const BaseLayout = () => (
    <>
        <Header />
        <StyledMain>
            <Outlet />
        </StyledMain>
        <Footer />
    </>
);
