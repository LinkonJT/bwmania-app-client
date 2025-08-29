import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AppNavbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  // const handleSignOut = async ()=>{
  //   try {
  // await signOutUser()
  // console.log("logged out successfully")
  // navigate('/')
  //   }
  //   catch (error){
  //     console.log("failed to logout", error)
  //   }
  // }

  /***another way with swal */

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    });
    if (result.isConfirmed) {
      try {
        await signOutUser();
        navigate("/");
      } catch (error) {
        console.log("Failed to sign out", error);
        Swal.fire("Error", "Failed to sign out", "error");
      }
    }
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="/vite.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {user ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Link to="/signIn">
            <Button>Sign in</Button>
          </Link>
        )}

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink className="hover:bg-amber-400 text-gray-500 hover:text-white p-1 rounded-sm" to="/" active>Home</NavLink>
        <NavLink className="hover:bg-amber-400 text-gray-500 hover:text-white p-1 rounded-sm" to="/about">About</NavLink>
        <NavLink className="hover:bg-amber-400 text-gray-500 hover:text-white p-1 rounded-sm" to="/all-products">All Products</NavLink>
        <NavLink className="hover:bg-amber-400 text-gray-500 hover:text-white p-1 rounded-sm" to="/add-products">Add Products</NavLink>
        <NavLink className="hover:bg-amber-400 text-gray-500 hover:text-white p-1 rounded-sm" href="#">Contact</NavLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default AppNavbar;
