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
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
