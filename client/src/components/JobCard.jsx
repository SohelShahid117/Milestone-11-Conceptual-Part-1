import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  console.log(job);
  const {
    _id,
    buyer_email,
    category,
    deadline,
    description,
    job_title,
    min_price,
    max_price,
  } = job;
  console.log(buyer_email);
  return (
    <Link
      to={`/job/${_id}`}
      className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {/* Mar 10, 2019 */}
          Deadline : {deadline}
        </span>
        <a
          className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
          tabindex="0"
          role="button"
        >
          {category}
        </a>
      </div>

      <div className="mt-2">
        <Link
          to={`/job/${_id}`}
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
          tabindex="0"
          role="link"
        >
          {job_title}
        </Link>
        <p
          title={description}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          {description.substring(0, 70)}...
          <span className="text-2xl text-orange-400">Read More</span>
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span>Min Price : ${min_price}</span>
        <span>Max Price : ${max_price}</span>
        {/* <a
          href="#"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          tabindex="0"
          role="link"
        >
          Read more
        </a> */}

        {/* <div className="flex items-center">
          <img
            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
            src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
            alt="avatar"
          />
          <a
            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
            tabindex="0"
            role="link"
          >
            Khatab wedaa
          </a>
        </div> */}
      </div>
    </Link>
  );
};

export default JobCard;
