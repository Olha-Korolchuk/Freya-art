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

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<SignLayout />}>
                <Route path={LINK_TEMPLATES.SIGN_UP} element={<SignUp />} />
                <Route path={LINK_TEMPLATES.SIGN_IN} element={<SignIn />} />
                <Route path={LINK_TEMPLATES.CREATE} element={<CreateArtPage />} />
                <Route path={LINK_TEMPLATES.EDIT(':id')} element={<EditArtPage />} />
            </Route>
            <Route path={LINK_TEMPLATES.HOME} element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path={LINK_TEMPLATES.PROFILE(':id')} element={<Profile />} />
                <Route path={LINK_TEMPLATES.ALL_WORKS()} element={<AllWorks />} />
                <Route path={LINK_TEMPLATES.DETAILED(':id')} element={<Detailed />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
