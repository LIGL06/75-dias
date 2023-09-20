import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Landing from '../Main/Landing';
import SignUp from '../SignUp/Signup';
import SignIn from '../SignIn/Signin';
import Form from '../Form/Form';

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
  {
    path: "/dashboard",
    element: <Form />,
  },
]);