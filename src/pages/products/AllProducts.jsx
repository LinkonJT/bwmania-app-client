import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Card } from 'flowbite-react';
import ProductsCard from './ProductsCard';
import { Spinner } from "flowbite-react";

const AllProducts = () => {
//the classic useEffect + useState + fetch combo.
const [products, setProducts] = useState([]);
 const [isFetching, setIsFetching] = useState(true);  // Track if products are being fetched
const {loading} = useAuth();
const BASE = import.meta.env.VITE_API_BASE_URL;


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE}/products`);
      const data = await res.json();
     console.log('Fetched Products:', data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products");
    }finally {
        setIsFetching(false);  // After fetching completes, stop showing loading
      }
  };

  fetchProducts();  // This will fetch the products when the component mounts
}, []);  // Empty dependency array to ensure this runs only once on mount


//****You can combine async/await with the null trick******
// const [products, setProducts] = useState(null); // null = loading

// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(`${BASE}/products`);
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       toast.error("Error fetching products");
//       setProducts([]); // fallback to empty array
//     }
//   };

//   fetchProducts();
// }, []);

if(loading || isFetching){
  return <div className="flex justify-center items-center"><Spinner aria-label="Default status example" /></div>;
}

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
          {/* So the brief “No products found” flash disappears if you start with null instead of [] and show a spinner for null. */}
{/* {
    products.map((product)=>{
         return (
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
    </Card>
         )
    })
} */}

{

products.length === 0? (<p>No products Found</p>) : (products.map((product)=><ProductsCard key={product._id} product={product}></ProductsCard>))

}

        </div>
    );
};

export default AllProducts;