import React from 'react';
import { Button, Card, Label, TextInput } from "flowbite-react";
import useAuth from '../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';


const SignIn = () => {

 const {signInUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate()



  const handleSignIn = async(e)=>{
     e.preventDefault()
     const form = e.target 
    //  const email = form.email.value
    //  const password = form.password.value

    const formData = new FormData(form)
    const {email, password} = Object.fromEntries(formData.entries())


    await signInUser(email, password)
    .then(()=>{
          Swal.fire({
  position: "center",
  icon: "success",
  title: "Sign In successfull",
  showConfirmButton: false,
  timer: 1500
});
navigate ('/')
    })
.catch((error)=>{

    Swal.fire({
          position: "center",
          icon: "error",
          title: "SignIn failed",
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
                  <form onSubmit={handleSignIn} className="flex max-w-md flex-col gap-4">
            
       
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
             <Button type="submit" >Sign In</Button>
             <div className="space-y-3">
                   <Button
                   onClick={handleGoogleSignIn}
                     type="button"
                     className="btn bg-base-100 btn-outline w-full">
                     <FcGoogle size={24} /> Login with Google
                   </Button>
                   <p className="font-semibold text-center text-gray-300">
                     Don't Have An Account?{" "}
                     <NavLink className="text-blue-700 hover:underline" to="/SignUp">
                       SignUp
                     </NavLink>
                   </p>
                 </div>
       
           </form>
           </Card>
    );
};

export default SignIn;