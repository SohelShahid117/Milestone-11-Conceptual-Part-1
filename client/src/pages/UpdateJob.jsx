import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`http://localhost:3000/jobDetails/${id}`);
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
    buyer,
  } = job;

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    console.log("hello");
    const form = e.target;
    console.log(form);
    const job_title = form.jobtitle.value;
    const buyer_email = form.email.value;
    const deadline = form.deadline.value;
    const category = form.category.value;
    const min_price = parseFloat(form.minprice.value);
    const max_price = parseFloat(form.maxprice.value);
    const description = form.description.value;

    const updateJobData = {
      job_title,
      deadline,
      category,
      min_price,
      max_price,
      description,
      buyer_email,
      buyer: {
        buyer_email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };
    console.table(updateJobData);
    try {
      const { data } = await axios.put(
        `http://localhost:3000/updateJob/${id}`,
        updateJobData
      );
      console.log(data);
      if (data.modifiedCount) {
        toast.success("data updated successfully");
        navigate(`/myPostedJob`);
      }
    } catch (err) {
      console.log(err);
    }
    //   form.reset("");
  };

  return (
    <div>
      <h2>Update the Job</h2>
      <div>
        {/* <h2>Add Job Page</h2> */}
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Post A Job
          </h2>

          <form onSubmit={handleUpdateJob}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="jobtitle"
                >
                  Job Title
                </label>
                <input
                  id="jobtitle"
                  type="text"
                  name="jobtitle"
                  defaultValue={job.job_title}
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
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
                  type="date"
                  name="deadline"
                  defaultValue={job.deadline}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={job.category}
                  required
                  className="p-[10px] border-2 rounded-md"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="minprice"
                >
                  Minimum Price
                </label>
                <input
                  id="minprice"
                  type="number"
                  name="minprice"
                  defaultValue={job.min_price}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="maxprice"
                >
                  Maximum Price
                </label>
                <input
                  id="maxprice"
                  type="number"
                  name="maxprice"
                  defaultValue={job.max_price}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                className="text-gray-700 dark:text-gray-200"
                for="description"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                name="description"
                defaultValue={job.description}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Update Job
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UpdateJob;
