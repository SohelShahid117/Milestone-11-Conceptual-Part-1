import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Layouts/Root";
import AuthProvider from "./provider/AuthProvider";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import JobDetails from "./pages/JobDetails";
import AddJob from "./pages/AddJob";
import ErrorPage from "./pages/Errorpage";
import MyPostedJob from "./pages/myPostedJob";
import UpdateJob from "./pages/UpdateJob";
import PrivateRoute from "./privateRoute/PrivateRoute";
import MyBids from "./pages/MyBids";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <div className="text-3xl font-lato">Welcome to JS Enterprise</div>,
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        // loader: () => fetch(`${import.meta.env.VITE_API_URL / allJobs}`),
        loader: () => fetch("http://localhost:3000/allJobs"),
        // loader: () => fetch(`import.meta.env.VITE_API_URL`),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/jobDetails/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
        // loader: ({ params }) => fetch(`http://localhost:3000/job${params.id}`),
        // loader: () => fetch(`http://localhost:3000/job/:id`),
      },
      {
        path: "/addJob",
        element: <AddJob></AddJob>,
      },
      {
        path: "/myPostedJob",
        element: <MyPostedJob></MyPostedJob>,
      },
      {
        path: "/updateJob/:id",
        element: <UpdateJob></UpdateJob>,
      },
      {
        path: "/myBids",
        element: <MyBids></MyBids>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>
  </React.StrictMode>
);
