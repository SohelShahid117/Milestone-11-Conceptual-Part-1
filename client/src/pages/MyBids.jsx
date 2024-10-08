import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  console.log(user?.email);
  useEffect(() => {
    // const getData = async () => {
    //   const { data } = await axios(
    //     `http://localhost:3000/myBidJobs/${user?.email}`
    //   );
    //   console.log(data);
    //   setBids(data);
    // };
    getData();
  }, [user]);
  const getData = async () => {
    const { data } = await axios(
      `http://localhost:3000/myBidJobs/${user?.email}`,
      { withCredentials: true }
    );
    console.log(data);
    setBids(data);
  };
  console.log(bids);
  // const handleStatus = (id) => {
  //   console.log(id);
  // };
  //handle status
  const handleStatus = async (id, previousStatus, currentStatus) => {
    if (previousStatus == currentStatus)
      return toast.error(
        "sorry vai r samne jaien na COZ preStatus & currentStatus same"
      );
    console.log("hello", id, previousStatus, currentStatus);
    const status = currentStatus;
    const { data } = await axios.patch(
      `http://localhost:3000/updateBidStatus/${id}`,
      { status }
    );
    getData();
    console.log(data);
  };
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          My Bid Jobs
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {bids.length}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button class="flex items-center gap-x-2">
                        <span>Title</span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button class="flex items-center gap-x-2">
                        <span>Deadline</span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button class="flex items-center gap-x-2">
                        <span>Price</span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button class="flex items-center gap-x-2">
                        <span>Category</span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button class="flex items-center gap-x-2">
                        <span>Status</span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button class="flex items-center gap-x-2">
                        <span>Buyer Email</span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button class="flex items-center gap-x-2">
                        <span>Action</span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {bids.map((bid) => (
                    <tr key={bid._id}>
                      <td className="px-4 py-4 text-lg  text-gray-700 whitespace-nowrap">
                        <span>{bid.job_title}</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <span>{bid.bidderDeadline}</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <span>${bid.price}</span>
                      </td>
                      <td className="px-4 py-4 mx-auto text-sm font-medium text-gray-700 whitespace-nowrap">
                        <span
                          className={`px-2 py-2  mx-auto flex  ${
                            bid.category == "Web Development" && "bg-green-400"
                          } ${bid.category == "Web Design" && "bg-pink-400"} ${
                            bid.category == "Digital Marketing" &&
                            "bg-orange-400"
                          }`}
                        >
                          {bid.category}
                        </span>
                      </td>
                      <td
                        title={bid.description}
                        className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap "
                      >
                        <span
                          className={`px-2 py-2  mx-auto flex w-[200px] h-auto ${
                            bid.status == "pending" && "bg-yellow-200"
                          } ${bid.status == "rejected" && "bg-red-400"}  ${
                            bid.status == "in-progress" && "bg-green-300"
                          } ${bid.status == "confirm" && "bg-green-500"}`}
                        >
                          {bid.status}
                          {/* {bid.description.substring(0, 30)}... */}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-lg  text-gray-700 whitespace-nowrap">
                        <span>{bid.buyer_email}</span>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="p-2 mx-2 text-center">
                          <button
                            onClick={() =>
                              handleStatus(bid._id, bid.status, "confirm")
                            }
                            className={`btn ${
                              bid.status !== "in-progress"
                                ? "btn-disabled"
                                : "text-green-300 btn-primary transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                            }`}
                          >
                            <GrTransaction />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBids;
