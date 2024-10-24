import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { BaseLayout } from './layouts/BaseLayout';
import { LINK_TEMPLATES } from './constants/link';
import React from 'react';
import { SignUp } from './modules/SignUp';
import { SignLayout } from './layouts/SignLayouts';
import { SignIn } from './modules/SignIn';
import { Profile } from './modules/Profile';
import { AllWorks } from './modules/AllWorks';
import { ModifyArt } from './modules/ModifyArt';

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<SignLayout />}>
                <Route path={LINK_TEMPLATES.SIGN_UP} element={<SignUp />} />
                <Route path={LINK_TEMPLATES.SIGN_IN} element={<SignIn />} />
                <Route path={LINK_TEMPLATES.MODIFY} element={<ModifyArt />} />
            </Route>
            <Route path={LINK_TEMPLATES.HOME} element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path={LINK_TEMPLATES.PROFILE()} element={<Profile />} />
                <Route path={LINK_TEMPLATES.ALL_WORKS()} element={<AllWorks />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
