import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/register.jpg";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Registration = () => {
  const {
    createUser,
    user,
    setUser,
    loading,
    setLoading,
    signIn,
    signInWithGoogle,
    logOut,
    updateProfile,
  } = useContext(AuthContext);
  console.log(createUser);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(e);
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(form, name, photo, email, password);
    try {
      const result = await createUser(email, password);
      console.log(result);
      await updateProfile(name, photo);
      setUser({ ...user, photoURL: photo, displayName: name });
      navigate("/");
      toast.success("signUp successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-12">
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            {/* or registration with email */}
            Registration with email
          </a>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="userName"
            >
              User Name
            </label>
            <input
              id="userName"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              name="name"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="photoURL"
            >
              Photo
            </label>
            <input
              id="photoURL"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              name="photo"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="registrationEmailAddress"
            >
              Email Address
            </label>
            <input
              id="registrationEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              name="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="registrationPassword"
              >
                Password
              </label>
            </div>

            <input
              id="registrationPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="password"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Registration Now
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <p className="text-md text-gray-500  dark:text-gray-400 ">
            r u registered? Go
          </p>
          <Link
            to="/login"
            className="text-md text-orange-500 uppercase dark:text-gray-400 hover:underline"
          >
            Login
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>

      <div
        className="hidden bg-cover lg:block lg:w-1/2 pr-20"
        style={{
          //   backgroundImage: `url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')`,
          backgroundImage: `url(${registerImg})`,
        }}
      ></div>
    </div>
  );
};

export default Registration;
