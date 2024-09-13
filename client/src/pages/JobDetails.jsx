import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`http://localhost:3000/job/${id}`);
      console.log(data);
      setJob(data);
    };
    getData();
  }, []);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const jobId = _id;
    const buyerDeadline = deadline;
    // const price = form.price.value;
    const price = parseFloat(form.price.value);
    const bidderEmail = form.email.value;
    const comment = form.comment.value;
    const bidderDeadline = form.deadline.value;
    const status = "pending";
    // console.log(form, price, email, comment, deadline);
    if (bidderEmail === buyer_email)
      return toast.error("Action not permitted!");
    if (price < parseFloat(min_price) || price > parseFloat(max_price))
      return toast.error("Offer Should be in Price range.");
    const bidData = {
      jobId,
      price,
      bidderEmail,
      comment,
      bidderDeadline,
      buyerDeadline,
      status,
      category,
      buyer_email,
      status,
    };
    console.table(bidData);
    try {
      const { data } = await axios.post("http://localhost:3000/bid", bidData);
      console.log(data);
      if (data.acknowledged) {
        toast.success("data inserted to database successfully");
      }
    } catch (err) {
      console.log(err);
    }
    form.reset("");
  };
  return (
    <div className="flex mt-10 px-5 py-5 gap-5">
      <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
          <span
            className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
            tabindex="0"
            role="link"
          >
            {job_title}
          </span>
          <p
            title={description}
            className="mt-2 text-gray-600 dark:text-gray-300"
          >
            {description}
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">Buyer Details : </h2>
          <span>Email : {buyer_email}</span>
        </div>
        <div className="mt-4">
          <h2 className="text-xl">
            Price Range : ${min_price} - ${max_price}{" "}
          </h2>
        </div>
        {/* <div className="flex items-center justify-between mt-4">
          <span>Min Price: ${min_price}</span>
          <span>Max Price : ${max_price}</span>
        </div> */}
      </div>
      <div>
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Place A Bid
          </h2>

          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200" for="price">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="comment"
                >
                  Comment
                </label>
                <input
                  id="comment"
                  name="comment"
                  type="text"
                  required
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="deadline"
                >
                  Deadline
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <input
                type="submit"
                value="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
