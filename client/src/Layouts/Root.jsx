import React, { useContext } from "react";
import Navbar from "./../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";

const Root = () => {
  const { mal } = useContext(AuthContext);
  console.log(mal);
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-50px-220px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
