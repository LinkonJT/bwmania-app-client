import { Button, Card } from 'flowbite-react';
import React from 'react';
import { NavLink } from 'react-router';

const ProductsCard = ({product}) => {




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
      
      <NavLink to={`/product/${product._id}`}><Button>Details</Button></NavLink>
    </Card>
    );
};

export default ProductsCard;