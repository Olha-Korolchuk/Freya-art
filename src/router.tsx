import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./modules/HomePage";
import { BaseLayout } from "./layouts/BaseLayout";
import { LINK_TEMPLATES } from "./constants/link";
import React from "react";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={LINK_TEMPLATES.HOME} element={<BaseLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
