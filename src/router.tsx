import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LINK_TEMPLATES } from './constants/link';
import { BaseLayout } from './layouts/BaseLayout';
import { SignLayout } from './layouts/SignLayouts';
import { AllWorks } from './modules/AllWorks';
import { CreateArtPage, EditArtPage } from './modules/ArtActions';
import { Detailed } from './modules/Detailed';
import { HomePage } from './modules/HomePage';
import { Profile } from './modules/Profile';
import { SignIn } from './modules/SignIn';
import { SignUp } from './modules/SignUp';
import { FC } from 'react';
import { NotFoundPage } from './modules/NotFound';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface IRouterProps {
    isAuth: boolean;
    isOpenPages?: boolean;
}

const ScrollToTop = (props: { children: any }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, [location]);

    return <>{props.children}</>;
};

export const Router: FC<IRouterProps> = ({ isAuth, isOpenPages }) => (
    <BrowserRouter>
        <ScrollToTop>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route element={<SignLayout />}>
                    {isAuth || isOpenPages ? (
                        <>
                            <Route path={LINK_TEMPLATES.CREATE} element={<CreateArtPage />} />
                            <Route path={LINK_TEMPLATES.EDIT(':id')} element={<EditArtPage />} />
                        </>
                    ) : (
                        <>
                            <Route path={LINK_TEMPLATES.SIGN_UP} element={<SignUp />} />
                            <Route path={LINK_TEMPLATES.SIGN_IN} element={<SignIn />} />
                        </>
                    )}
                    {isOpenPages && (
                        <>
                            <Route path={LINK_TEMPLATES.SIGN_UP} element={<SignUp />} />
                            <Route path={LINK_TEMPLATES.SIGN_IN} element={<SignIn />} />
                        </>
                    )}
                </Route>
                <Route path={LINK_TEMPLATES.HOME} element={<BaseLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path={LINK_TEMPLATES.PROFILE(':id')} element={<Profile />} />
                    <Route path={LINK_TEMPLATES.ALL_WORKS()} element={<AllWorks />} />
                    <Route path={LINK_TEMPLATES.DETAILED(':id')} element={<Detailed />} />
                </Route>
            </Routes>
        </ScrollToTop>
    </BrowserRouter>
);
