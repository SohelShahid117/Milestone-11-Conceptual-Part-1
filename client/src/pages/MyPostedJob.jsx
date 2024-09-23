import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyPostedJob = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  console.log(user?.email);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `http://localhost:3000/jobs/${user?.email}`,
        { withCredentials: true }
      );
      console.log(data);
      setJobs(data);
    };
    getData();
  }, [user]);
  console.log(jobs);

  const handleDeleteJob = async (id) => {
    console.log("delete-->", id);
    try {
      const { data } = await axios.delete(`http://localhost:3000/jobs/${id}`);
      console.log(data);
      if (data.deletedCount) {
        toast.success("deleted successfully");
        // const remainingJobs = jobs.filter(jobs._id !== id);
        const remainingJobs = jobs.filter((j) => j._id !== id);
        console.log(remainingJobs);
        setJobs(remainingJobs);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          My Posted Jobs
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {jobs.length}
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
                        <span>Price Range</span>
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
                        <span>Description</span>
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
                  {jobs.map((job) => (
                    <tr key={job._id}>
                      <td className="px-4 py-4 text-lg  text-gray-700 whitespace-nowrap">
                        <span>{job.job_title}</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <span>{job.deadline}</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <span>
                          ${job.min_price}-${job.max_price}
                        </span>
                      </td>
                      <td className="px-4 py-4 mx-auto text-sm font-medium text-gray-700 whitespace-nowrap">
                        <span
                          className={`px-2 py-2  mx-auto flex  ${
                            job.category == "Web Development" && "bg-green-400"
                          } ${job.category == "Web Design" && "bg-pink-400"} ${
                            job.category == "Digital Marketing" &&
                            "bg-orange-400"
                          }`}
                        >
                          {job.category}
                        </span>
                      </td>
                      <td
                        title={job.description}
                        className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap "
                      >
                        <span className="w-[50px] h-auto">
                          {/* {job.description} */}
                          {job.description.substring(0, 30)}...
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          <Link
                            to={`/updateJob/${job._id}`}
                            className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
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

export default MyPostedJob;
