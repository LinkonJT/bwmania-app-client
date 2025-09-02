import React from 'react';
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useMutation } from '@tanstack/react-query';


const AddCar = () => {

  const axiosInstance = useAxiosInstance()

const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

// UseMutation hook for POST request to add a new car
  const mutation = useMutation({
    mutationFn: async (data) => {
      // Prepare the car data, add created_at field
      const carData = {
        ...data,
        created_at: new Date().toISOString(),  // Only set created_at on creation
      };

          // POST request to API
      const res = await axiosInstance.post('/cars', carData);
      console.log(res.data); // Log response data to check
      return res.data;  // Return the response data from the API
    },
      onSuccess: () => {
        toast.success("Car added successfully");
        // Optionally, you can invalidate or refetch any relevant queries here
        reset()
      },
      onError: (error) => {
        const errorMessage = error.res?.data?.message || error.message || "Failed to add car";
        toast.error(`Error adding car: ${errorMessage}`);

        // toast.error(`Error adding car: ${error.message}`); //or just use this simpler version
        console.error(error); // Keep for debugging
      },
     
    
});

  const onSubmit = (data) => {
    mutation.mutate(data);  // Trigger the mutation with the form data
  };

    return (
       <Card>
              <h1 className='text-white text-sm text-center'>ADD cars Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
        <div className="flex max-w-md flex-col gap-4">
      
          {/* Title */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title">Car Title</Label>
            </div>
            <TextInput
              id="title"
              type="text"
              sizing="sm"
              {...register("title", { required: "Title is required" })}
              aria-invalid={!!errors.title}
            />
            {errors.title && <p role="alert" className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
      
          {/* Photo URL */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="photoURL">Photo URL</Label>
            </div>
            <TextInput
              id="photoURL"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register("photoURL", {
                required: "Photo URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid URL starting with http(s)://",
                },
              })}
              aria-invalid={!!errors.photoURL}
            />
            {errors.photoURL && <p role="alert" className="text-red-500 text-sm">{errors.photoURL.message}</p>}
          </div>
      
          {/* Price */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price">Price</Label>
            </div>
            <TextInput
              id="price"
              type="number"
              inputMode="decimal"
              step="0.01"
              sizing="sm"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true, //automatically saves as NUMBER instead of string
                min: { value: 0.00, message: "Must be 0 or greater than 0" },
              })}
              aria-invalid={!!errors.price}
            />
            {errors.price && <p role="alert" className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
      
          {/* Description */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description">Car Description</Label>
            </div>
            <TextInput
              id="description"
              type="text"
              sizing="lg"
              {...register("description", {
                required: "Description is required",
                // maxLength: { value: 500, message: "Max 500 characters" },
              })}
              aria-invalid={!!errors.description}
            />
            {errors.description && <p role="alert" className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
      
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading? 'Adding..' : 'Submit'}</Button>
        </div>
      </form>
      
          </Card>
    );
};

export default AddCar;