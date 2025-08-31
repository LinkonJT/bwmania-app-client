import React from 'react';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';


const SignUp = () => {

    const {createUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate()

const handleSignUp=(e)=>{
    e.preventDefault();

    const form = e.target;
    // const name = form.name.value;
    // const photoURL = form.photoURL.value;
    // const email = form.email.value;
    // const password = form.password.value;
    // console.log({ name, photoURL, email, password });

const formData = new FormData(form);
const {name, photoURL, email, password} = Object.fromEntries(formData.entries())

/**password  */

    
/**Promise chaining style */
/******signup and create user in firebase */
    //call createuser

createUser(email, password)
    .then((result) => {
      return updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });
    })
    .then(() => {
      // 👇 send user data to your backend
      const newUser = {
        name,
        email,
        photoURL,
        role: "customer", // default role if you want
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("User saved to DB:", data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign Up Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/signIn");
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "SignUp failed",
        text: error.message,
      });
    })}


    /**Promise chaining style */
// const handleGoogleSignIn = () => {
//   signInWithGoogle()
//     .then((result) => {
//       const u = result.user;
//       const newUser = {
//         name: u.displayName || "Google User",
//         email: u.email,
//         photoURL: u.photoURL || "",
//         role: "customer",
//         created_at: new Date().toISOString(),
//         last_log_in: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//       };

//       return fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(newUser),
//       });
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("User saved to DB (Google):", data);
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Google Sign in successful",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       navigate("/");
//     })
//     .catch((error) => {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Google sign in failed",
//         text: error.message,
//       });
//     });
// };


/***GoogleSignIn async-await method */
const handleGoogleSignIn = async () => { //You define an async function. Using async means you can use await inside
  try { //Start a try/catch block so if anything throws an error, you handle it in catch.
    const result = await signInWithGoogle(); //Call your Firebase auth function (signInWithGoogle). Firebase opens the Google popup, the user logs in, and you await the result.The result contains result.user with email, name, photo, etc.
    const u = result.user; //Extract the actual user object from Firebase

    //Prepare a plain JS object with the user data.Take displayName, email, and photoURL from Firebase.If any are missing, fall back to defaults.Add role and timestamps so your backend has a complete record.
    const newUser = {
      name: u.displayName || "Google User",
      email: u.email,
      photoURL: u.photoURL || "",
      role: "customer",
      created_at: new Date().toISOString(),
      last_log_in: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    //Send a POST request to your backend at /users. method: "POST" means “create a new user”.headers tell the server it’s JSON.body is the stringified newUser object.
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    });

    //Wait for the backend’s JSON response, then log it.This should show something like { acknowledged: true, insertedId: ... } if the backend actually saved it.
    const data = await res.json();
    console.log("User saved to DB (Google):", data);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Google Sign in successful",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/"); //Redirect the user back to 
  } catch (error) { //If anything in the try fails (sign-in, fetch, etc.), show an error alert.
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Google sign in failed",
      text: error.message,
    });
  }
};


    return (
     
    <Card className='w-full'>
           <form onSubmit={handleSignUp} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2">Name</Label>
        </div>
        <TextInput id="name" name='name' type="text" placeholder="Your full name" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="photoURL">Photo URL</Label>
        </div>
        <TextInput id="photoURL" name='photoURL' type="url" placeholder="Your photo url here" required shadow />
      </div>
      <div>

        <div className="mb-2 block">
          <Label htmlFor="email2">Your email</Label>
        </div>
        <TextInput id="email2" name="email" type="email" placeholder="name@flowbite.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2">Your password</Label>
        </div>
        <TextInput id="password2" name="password" type="password" required shadow />
      </div>
      {/* <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password">Repeat password</Label>
        </div>
        <TextInput id="repeat-password" type="password" required shadow />
      </div>
    */}
      <Button type="submit">Sign Up</Button>
      <div className="space-y-3">
            <Button onClick={handleGoogleSignIn}
              type="button"
              className="btn bg-base-100 btn-outline w-full">
              <FcGoogle size={24} /> Login with Google
            </Button>
            <p className="font-semibold text-center text-gray-300">
              Already Have An Account?{" "}
              <NavLink className="text-blue-700 hover:underline" to="/signIn">
                SignIn
              </NavLink>
            </p>
          </div>

    </form>
    </Card>
    );
};

export default SignUp;