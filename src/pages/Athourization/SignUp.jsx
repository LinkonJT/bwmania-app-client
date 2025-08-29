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

    

/******signup and create user in firebase */
    //call createuser

createUser(email, password)
.then((result)=>{
    return updateProfile(result.user,{
        displayName: name,
        photoURL: photoURL
    })
})
.then(()=>{
    Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
})
navigate ('/signIn')
})
.catch((error)=>{
Swal.fire({
          position: "center",
          icon: "error",
          title: "SignUp failed",
          text: error.message,
        });
})
}

const handleGoogleSignIn=()=>{

    signInWithGoogle()
    .then(()=>{
        Swal.fire({
  position: "center",
  icon: "success",
  title: "Google Sign UP successfull",
  showConfirmButton: false,
  timer: 1500
});
navigate ('/');
})
.catch((error)=>{

    Swal.fire({
          position: "center",
          icon: "error",
          title: "SignUp failed",
          text: error.message,
        });
})

}


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