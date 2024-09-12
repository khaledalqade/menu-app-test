'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryButtons from './CategoryButtons';
import Cards from './Cards';
// http://192.168.8.228:8000/api
const fetchCategories = () => {
  // return axios.get(`http://192.168.8.228:8000/api/v1/menuCategory?filter[account]=22`)
  return axios.get(`https://do-env.xyz/api/v1/menuCategory?filter[account]=22`)
  // return axios.get(`https://do-env.xyz/api/v1/menuCategory?filter[account]=2`)
    .then(response => response.data.result.data)
    .catch(error => {
      console.error('Error fetching categories:', error);
      return [];
    });
};



// const fetchAllProducts = () => {
//   return axios({
//     method: 'get',
//     url: 'http://do-env.xyz/api/v1/product/show',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     data: {
//       id:  localStorage.getItem('userId') || null,
//     }
//   })
//   .then(response => response.data.result.data)
//   .catch(error => {
//     console.error('Error fetching products:', error);
//     return [];
//   });
// };
 
const fetchAllProducts = () => {
  // return axios.get(`http://192.168.8.228:8000/api/v1/product?user_id=12`)
  return axios.get(`https://do-env.xyz/api/v1/product`
  )
  // return axios.get(`https://do-env.xyz/api/v1/product`)
    .then(response => response.data.result.data)
    .catch(error => {
      console.error('Error fetching products:', error);
      return [];
    });
};

const fetchProductsByCategory = (categoryId) => {
  // return axios.get(`https://do-env.xyz/api/v1/product?filter[category]=${categoryId}`)
  // return axios.get(`http://192.168.8.228:8000/api/v1/product?filter[category]=${categoryId}`)
  return axios.get(`https://do-env.xyz/api/v1/product?filter[category]=${categoryId}`)
    .then(response => response.data.result.data)
    .catch(error => {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      return [];
    });
};

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    fetchAllProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSelectCategory = (categoryId) => {
    fetchProductsByCategory(categoryId)
      .then(data => setFilteredProducts(data))
      .catch(error => console.error(`Error fetching products for category ${categoryId}:`, error));
  };

  const handleResetFilter = () => {
    setFilteredProducts([]);
  };

  return (
    <div className="container mx-auto mt-8">
      <span className='font-semibold text-[16px] md:text-[1.25rem] mb-1'>All foods<sup className='text-[12px] md:text-[0.81rem]'> (232)</sup></span>
      <CategoryButtons categories={categories} onSelectCategory={handleSelectCategory} onResetFilter={handleResetFilter} />
      <Cards products={filteredProducts.length > 0 ? filteredProducts : products} />
    </div>
  );
};

export default App;
