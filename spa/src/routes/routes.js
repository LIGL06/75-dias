import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Landing from '../Main/Landing';
import SignUp from '../Main/Signup';
import SignIn from '../SignIn/Signin';


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