import React from "react";
import Header from "../../components/TestComponent/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/TestComponent/Footer/Footer";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
}
export default Layout;