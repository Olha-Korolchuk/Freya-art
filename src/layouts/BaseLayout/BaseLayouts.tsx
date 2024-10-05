import { Outlet } from "react-router-dom";
import { Header } from "./components";
import React from "react";

export const BaseLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
