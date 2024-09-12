import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import axios from "axios";

const TabCategories = ({ jobs }) => {
  console.log(jobs);

  // const [jobsss, setJobsss] = useState([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios("http://localhost:3000/allJobs");
  //     console.log(data);
  //     setJobsss(data);
  //   };
  //   getData();
  // }, []);
  // console.log(jobsss);

  return (
    <div className="mt-14  px-5 py-2">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold">Job Categories</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam,
          fugit minus! Omnis aliquam facilis nobis deserunt atque mollitia
          numquam, alias dolore beatae explicabo earum ratione cumque culpa
          eveniet dolor ipsum.
        </p>
      </div>
      <Tabs>
        <div className="flex flex-col items-center justify-center">
          <TabList>
            <Tab>Web Design </Tab>
            <Tab>Web Development</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
              {jobs
                .filter((j) => j.category == "Web Design")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                  // <h1>hello</h1>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
              {jobs
                .filter((j) => j.category == "Web Development")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                  // <h1>hello</h1>
                ))}
            </div>
            {/* <JobCard></JobCard> */}
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
              {jobs
                .filter((j) => j.category == "Digital Marketing")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                  // <h1>hello</h1>
                ))}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCategories;
