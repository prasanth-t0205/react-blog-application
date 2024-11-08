import React from "react";
import TopnavBar from "./TopnavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopnavBar />
      <Toaster />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
