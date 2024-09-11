import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";

const TabCategories = () => {
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
            <Tab>Web Design & Development</Tab>
            <Tab>Grphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
            <JobCard></JobCard>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCategories;
