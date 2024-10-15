import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import React from "react";
import { Footer } from "./components/Footer";

export const BaseLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
