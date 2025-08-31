import React from 'react';
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
const BASE = import.meta.env.VITE_API_BASE_URL
      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try{
// ensure price is a number
    // data.price = parseFloat(data.price); //use this if in the formfield type='number' is not set.


//add extra fields that aren't in the form

const payload = {
  ...data, //form input data
   created_at: new Date().toISOString(),       // first publish time
  updated_at: new Date().toISOString(),          // last modified time
  status: 'active',
}

    const res = await fetch(`${BASE}/products`, {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify(payload)

    })

    const result = await res.json()
    console.log('Saved:', result);
    toast.success('Data Saved to MongoDB')

    }catch (error){
         console.error(error);
toast.error('Error Saving Product')
    }
  }

    return (
    <Card>
        <h1 className='text-white text-sm text-center'>ADD Products Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
  <div className="flex max-w-md flex-col gap-4">

    {/* Title */}
    <div>
      <div className="mb-2 block">
        <Label htmlFor="title">Product Title</Label>
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
        <Label htmlFor="description">Product Description</Label>
      </div>
      <TextInput
        id="description"
        type="text"
        sizing="lg"
        {...register("description", {
          required: "Description is required",
          maxLength: { value: 500, message: "Max 500 characters" },
        })}
        aria-invalid={!!errors.description}
      />
      {errors.description && <p role="alert" className="text-red-500 text-sm">{errors.description.message}</p>}
    </div>

    <Button type="submit">Submit</Button>
  </div>
</form>

    </Card>
    );
};

export default AddProduct;