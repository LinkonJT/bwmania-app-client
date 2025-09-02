import { format } from 'date-fns';
import { Button, Card } from 'flowbite-react';
import React from 'react';
import { NavLink, useLoaderData, useNavigate } from 'react-router';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'animate.css';



const CarDetails = () => {

const car = useLoaderData()
//use date-fns library
const formattedDate = format(new Date(car.created_at), "dd-mm-yyyy") //mehotd-2
const navigate = useNavigate();
const axiosInstance = useAxiosInstance()

const mutation = useMutation({
    mutationFn: async(data) => {
      const res = await axiosInstance.delete(`/cars/${car._id}`)
      return res.data
    },
   onSuccess: () => {
      toast.success('Car deleted successfully');
      navigate('/all-cars');  // Redirect to the car list page after deletion
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete car';
      toast.error(`Error: ${errorMessage}`);
    },
  })

  // Trigger the delete mutation when the user clicks delete without SWAL alert
  // const handleDelete = () => {
  //   mutation.mutate();
  // };


   // Show SweetAlert confirmation before deleting the car
  const handleDelete = async () => {
    // Show the confirmation popup
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      timer: 5000,  // Close after 3 seconds
      timerProgressBar: true,
      showClass: { popup: 'animate__animated animate__bounceIn' },
       hideClass: {popup: 'animate__animated animate__fadeOut'}, // // Fade-out when closing
      position: 'center', //String (Possible values: 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end')


    });

    // If the user confirms, perform the deletion
    if (result.isConfirmed) {
      mutation.mutate();  // Proceed with the deletion
    }
  };



    return (
      <div>
             <Card
                     key={car._id}
                  className="max-w-sm"
                  imgAlt={car.title}  // Descriptive alt text for images
                  
                  imgSrc={car.photoURL}
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Tittle: {car.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Price: {car.price}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Description: {car.description}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Creation Date: {formattedDate}
                  </p>


                  <div className='flex gap-15'>
                    
                    <NavLink to={`/cars/edit/${car._id}`}><Button>Edit</Button></NavLink>

                    <Button onClick={handleDelete}>Delete</Button>
                  </div>
                
                </Card>
        </div>
    );
};

export default CarDetails;


// to={`/car/edit/${car._id}`} 
// onClick={handleDelete}