import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { BaseLayout } from './layouts/BaseLayout';
import { LINK_TEMPLATES } from './constants/link';
import React from 'react';
import { SignUp } from './modules/SignUp';
import { SignLayout } from './layouts/SignLayouts';

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path={LINK_TEMPLATES.SIGN_UP} element={<SignLayout />}>
                <Route index element={<SignUp />} />
            </Route>
            <Route path={LINK_TEMPLATES.HOME} element={<BaseLayout />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
