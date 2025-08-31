import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Card } from 'flowbite-react';
import ProductsCard from './ProductsCard';

const AllProducts = () => {
//the classic useEffect + useState + fetch combo.
const [products, setProducts] = useState([]);
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
    }
  };

  fetchProducts();  // This will fetch the products when the component mounts
}, []);  // Empty dependency array to ensure this runs only once on mount




    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
           
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