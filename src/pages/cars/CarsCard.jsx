import React from 'react';
import { Button, Card } from 'flowbite-react';
import { NavLink } from 'react-router';

const CarsCard = ({car}) => {
    return (
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
      
      <NavLink to={`/car/${car._id}`}><Button>Details</Button></NavLink>
    </Card>
    );
};

export default CarsCard;
