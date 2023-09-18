import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Landing from '../Main/Landing';
import SignIn from '../Main/Signin';
import SignUp from '../Main/Signup';


export default createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);