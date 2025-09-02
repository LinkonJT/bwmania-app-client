import React, { use } from 'react';
import CarsCard from './CarsCard';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const AllCars = () => {

const axiosInstance = useAxiosInstance();

 const { data: cars, isPending, isLoading, isError, error } = useQuery({
    queryKey: ['cars'],
    queryFn: async()=>{
        const res = await axiosInstance.get('/cars');
        return res.data
    }
  })

  if (isLoading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  if (isError) {
    return <div>Error: {error.message}</div>;  // Show error message
  }


    
    return (
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
          {/* So the brief “No products found” flash disappears if you start with null instead of [] and show a spinner for null. */}

{
cars.length === 0? (<p>No cars Found</p>) : (cars.map((car)=><CarsCard key={car._id} car={car}></CarsCard>))
}

        </div>
    );
};

export default AllCars;