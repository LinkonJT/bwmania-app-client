import { format } from 'date-fns';
import { Button, Card } from 'flowbite-react';
import React from 'react';
import { NavLink, useLoaderData } from 'react-router';

const CarDetails = () => {

const car = useLoaderData()
//use date-fns library
const formattedDate = format(new Date(car.created_at), "dd-mm-yyyy") //mehotd-2



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
                    
                    <NavLink ><Button>Edit</Button></NavLink>

                    <Button >Delete</Button>
                  </div>
                
                </Card>
        </div>
    );
};

export default CarDetails;


// to={`/car/edit/${car._id}`} 
// onClick={handleDelete}