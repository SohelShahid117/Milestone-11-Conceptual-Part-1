import React, { useEffect } from "react";
import Carousel from "./../components/Carousel";
import TabCategories from "../components/TabCategories";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const Home = () => {
  // const axios = require("axios");
  const allJobs = useLoaderData();
  console.log(allJobs);
  // console.log(JSON.stringify(allJobs));
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/allJobs")
  //     .then((res) => console.log(res.data));
  // }, []);

  return (
    <div>
      {/* <h2>home</h2> */}
      <Carousel></Carousel>
      <TabCategories jobs={allJobs}></TabCategories>
    </div>
  );
};

export default Home;
