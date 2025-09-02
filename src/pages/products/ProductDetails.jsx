import { Button, Card } from 'flowbite-react';
import React from 'react';
import { NavLink, useLoaderData, useNavigate } from 'react-router';
import { format } from 'date-fns';
import Swal from 'sweetalert2';



const ProductDetails = () => {

const product = useLoaderData(); // product data comes from the loader
// const formattedDate = new Date(product.created_at).toLocaleDateString('en-CA') //method-1

//use date-fns library
const formattedDate = format(new Date(product.created_at), "dd-mm-yyyy") //mehotd-2

//convert "2025-08-31T06:05:04.335Z" to 31/08/2025

 const navigate = useNavigate();  // For navigating after deletion
  const BASE = import.meta.env.VITE_API_BASE_URL;

  const handleDelete = async ()=>{
    const result = await Swal.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!",
    });
    if(result.isConfirmed){
      try{
        const res = await fetch(`${BASE}/products/${product._id}`, {
          method: 'DELETE'
        })
          if (!res.ok) {
          // If the delete operation fails
          throw new Error('Error deleting product');
        }

          await Swal.fire(
          'Deleted!',
          'The product has been deleted.',
          'success'
        );

        // Redirect to another page, like the product list, after successful deletion
        navigate('/all-products'); // Redirect to all products page
      }catch(error){
         console.error("Delete error:", error.message);
            Swal.fire({
              icon: "error",
              title: "Remove failed",
              text: error.message,
            });
      }
    }

  }

    return (
        <div>
             <Card
                     key={product._id}
                  className="max-w-sm"
                  imgAlt={product.title}  // Descriptive alt text for images
                  
                  imgSrc={product.photoURL}
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Tittle: {product.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Price: {product.price}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Description: {product.description}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Creation Date: {formattedDate}
                  </p>


                  <div className='flex gap-15'>
                    
                    <NavLink to={`/product/edit/${product._id}`} ><Button>Edit</Button></NavLink>

                    <Button onClick={handleDelete}>Delete</Button>
                  </div>
                
                </Card>
        </div>
    );
};

export default ProductDetails;