import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Athourization/SignUp";
import SignIn from "../pages/Athourization/SignIn";
import About from "../pages/About";
import AllProducts from "../pages/AllProducts";
import AddProduct from "../pages/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {path: '/', element: <Home></Home>},
        {path: '/signUp', element: <SignUp></SignUp>},
        {path: '/signIn', element: <SignIn></SignIn>},
        {path: '/about', element: <About></About>},
        {path: '/all-products', element: <AllProducts></AllProducts>},
        {path: '/add-products', element: <AddProduct></AddProduct>},

    ]
  },
]);