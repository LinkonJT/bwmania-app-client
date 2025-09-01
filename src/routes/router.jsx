import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Athourization/SignUp";
import SignIn from "../pages/Athourization/SignIn";
import About from "../pages/About";
import AllProducts from "../pages/products/AllProducts";
import AddProduct from "../pages/products/AddProduct";
import ProductDetails from "../pages/products/ProductDetails";
import EditProduct from "../pages/products/EditProduct";
import AllCars from "../pages/cars/AllCars";
import AddCar from "../pages/cars/AddCar";


const BASE = import.meta.env.VITE_API_BASE_URL;

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
        {path: '/product/:id', 
          element: <ProductDetails></ProductDetails>,
        loader: ({params})=>fetch(`${BASE}/product/${params.id}`)
      },
        {path: '/product/edit/:id', 
          element: <EditProduct></EditProduct>,
        loader: ({params})=>fetch(`${BASE}/product/${params.id}`)
      },
/**ALl cars using Hook-form, Axios, tanstack-query */
{path: '/all-cars', element: <AllCars></AllCars>},
{path: '/add-cars', element: <AddCar></AddCar>},



    ]
  },
]);